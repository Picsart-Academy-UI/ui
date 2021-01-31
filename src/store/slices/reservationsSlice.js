import { createSlice } from '@reduxjs/toolkit';
import { getTeams } from '../../services/teamsService';
import { getTables } from '../../services/tablesService';
import {
  getReservations,
  approveReservation,
  rejectReservation,
} from '../../services/reservationsService';
import { setTeams } from './teamsSlice';
import { setTables } from './tablesSlice';

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    pendingReservations: [],
    pendingReservationsWithData: {
      teams: [],
      pendingReservations: [],
      tables: [],
    },
    reservsApprPend: [],
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    setPendingReservations: (state, action) => {
      state.pendingReservations = action.payload;
    },
    setPendingReservationsWithData: (state, action) => {
      state.pendingReservationsWithData = action.payload;
    },
    removeFromPendingReservations: (state, action) => {
      state.pendingReservationsWithData.pendingReservations.splice(
        state.pendingReservationsWithData.pendingReservations.findIndex(
          (r) => r._id === action.payload
        ),
        1
      );
    },
    setPendingApprovedReservations: (state, action) => {
      state.reservsApprPend = action.payload;
    },
    addReservation: (state, action) => {
      state.reservations = [...state.reservations, action.payload];
    },
  },
});

export const {
  setReservations,
  setPendingReservations,
  setPendingReservationsWithData,
  removeFromPendingReservations,
  setPendingApprovedReservations,
  addReservation,
} = reservationsSlice.actions;

export const fetchReservations = (token) => async (dispatch) => {
  const res = await getReservations(token);
  dispatch(setReservations(res.data || []));
};

export const fetchPendingReservations = (token) => async (dispatch) => {
  const res = await getReservations(
    token,
    'status=pending&include_usersAndChairs=true'
  );
  dispatch(setPendingReservations(res.data || []));
};

export const fetchPendingReservationsWithData = (token) => async (
  dispatch,
  getState
) => {
  const state = getState();

  return Promise.all([
    getReservations(token, 'status=pending&include_usersAndChairs=true'),
    !state.teams.teams.length && getTeams(token),
    !state.tables.tables.length && getTables(token),
  ]).then(([pendingReservations, teams, tables]) =>
    Promise.all([
      dispatch(
        setPendingReservationsWithData({
          pendingReservations: pendingReservations.data,
          teams: !state.teams.teams.length ? teams.data : state.teams.teams,
          tables: !state.tables.tables.length
            ? tables.data
            : state.tables.tables,
        })
      ),
      teams && dispatch(setTeams(teams)),
      tables && dispatch(setTables(tables)),
    ])
  );
};

export const approve = (token, reservationId) => async (dispatch) => {
  const res = await approveReservation(token, reservationId);
  if (res.data) {
    dispatch(removeFromPendingReservations(res.data._id));
  }
  return res;
};

export const reject = (token, reservationId) => async (dispatch) => {
  const res = await rejectReservation(token, reservationId);
  if (res.data) {
    dispatch(removeFromPendingReservations(res.data._id));
  }
  return res;
};

export const fetchPendingApprovedReservations = (token) => async (dispatch) => {
  const res = await getReservations(token, 'status=pending,approved');
  dispatch(setPendingApprovedReservations(res.data || []));
};

export default reservationsSlice.reducer;
