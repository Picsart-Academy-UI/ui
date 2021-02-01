import { createSlice } from '@reduxjs/toolkit';
import {
  getReservations,
  deleteReservation,
} from '../../services/reservationsService';
import {
  add,
  getReservationOnSameDate,
  getReservationsAvailableMerging,
  deleteFromRes,
} from '../../utils/reservationHelper';
import { withoutHours } from '../../utils/dateHelper';

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    reservsApprPend: [],
    reservsApprPendTeam: [],
    selectedReservations: [],
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    setPendingReservations: (state, action) => {
      state.pendingReservations = action.payload;
    },
    setPendingApprovedReservations: (state, action) => {
      state.reservsApprPend = action.payload;
    },
    setPendingApprovedTeamReservations: (state, action) => {
      state.reservsApprPendTeam = action.payload;
    },
    setSelected: (state, action) => {
      state.selectedReservations = action.payload || [];
    },
    setSelectedReservations: (state, action) => {
      const newReservations = [...state.selectedReservations];

      const reservationSameDate = getReservationOnSameDate(
        newReservations,
        action.payload.date
      );

      if (reservationSameDate === undefined) {
        add(action.payload, newReservations);
      } else {
        deleteFromRes(action.payload, reservationSameDate, newReservations);
        if (reservationSameDate.id !== action.payload.id) {
          add(action.payload, newReservations);
        }
      }
      state.selectedReservations = newReservations;
    },
    setSelectedRow: (state, action) => {
      // selects the row
      const newReservations = action.payload.dates.reduce(
        (accumilator, item) => {
          if (
            item.date.getDay() !== 0 &&
            item.date.getDay() !== 6 &&
            item.isFree
          ) {
            const reservationAvailableForMerging = getReservationsAvailableMerging(
              accumilator,
              action.payload.name,
              item.date
            );
            if (reservationAvailableForMerging.length > 0) {
              const indexOfMerge = accumilator.indexOf(
                reservationAvailableForMerging[0]
              );
              accumilator[indexOfMerge] = {
                ...reservationAvailableForMerging[0],
                start_date:
                  reservationAvailableForMerging[0].start_date < item.date
                    ? reservationAvailableForMerging[0].start_date
                    : item.date,
                end_date:
                  reservationAvailableForMerging[0].end_date > item.date
                    ? reservationAvailableForMerging[0].end_date
                    : item.date,
              };
            } else {
              accumilator.push({
                isFree: item.isFree,
                end_date: withoutHours(item.date),
                start_date: withoutHours(item.date),
                chairName: action.payload.name,
                table_id: action.payload.table_id,
                id: action.payload.id,
              });
            }
          }
          return accumilator;
        },
        []
      );
      console.log(newReservations);
      state.selectedReservations = newReservations;
    },
    addReservation: (state, action) => {
      state.reservations = [action.payload, ...state.reservations];
      state.reservsApprPend = [action.payload, ...state.reservsApprPend];
    },
    deleteLocalReservation: (state, action) => {
      if (action.payload !== null) {
        const filterFunction = (item) => item._id !== action.payload;
        state.reservations = state.reservations.filter(filterFunction);
        state.reservsApprPend = state.reservsApprPend.filter(filterFunction);
      }
    },
  },
});

export const {
  setReservations,
  setPendingReservations,
  setPendingApprovedReservations,
  setPendingApprovedTeamReservations,
  deleteLocalReservation,
  addReservation,
  setSelectedReservations,
  setSelectedRow,
  setSelected,
} = reservationsSlice.actions;

export const fetchReservations = (token) => async (dispatch) => {
  const res = await getReservations(token);
  dispatch(setReservations(res.data || []));
};

export const fetchPendingReservations = (token) => async (dispatch) => {
  const res = await getReservations(token, 'status=pending');
  dispatch(setPendingReservations(res.data || []));
};

export const fetchPendingApprovedReservations = (token) => async (dispatch) => {
  const res = await getReservations(
    token,
    `status=approved,pending&include_usersAndChairs=true&from=${new Date()
      .toISOString()
      .slice(0, 10)}`
  );
  dispatch(setPendingApprovedReservations(res.data || []));
};

export const fetchPendingApprovedTeamReservations = (token, teamId) => async (
  dispatch
) => {
  const res = await getReservations(
    token,
    `status=approved,pending&include_usersAndChairs=true&from=${new Date()
      .toISOString()
      .slice(0, 10)}&team_id=${teamId}`
  );
  dispatch(setPendingApprovedTeamReservations(res.data || []));
};

export const deleteReservationRequest = (token, resId) => async (dispatch) => {
  const res = await deleteReservation(token, resId);
  dispatch(deleteLocalReservation(res.error ? null : resId));
};

export default reservationsSlice.reducer;
