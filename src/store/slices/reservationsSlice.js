import { createSlice } from '@reduxjs/toolkit';
import {
  getReservations,
  deleteReservation,
} from '../../services/reservationsService';

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    reservsApprPend: [],
    reservsApprPendTeam: [],
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
