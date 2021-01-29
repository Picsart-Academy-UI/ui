import { createSlice } from '@reduxjs/toolkit';
import { getReservations } from '../../services/reservationsService';

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    reservsApprPend: [],
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
    addReservation: (state, action) => {
      state.reservations = [...state.reservations, action.payload];
    },
  },
});

export const {
  setReservations,
  setPendingReservations,
  setPendingApprovedReservations,
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
  const res = await getReservations(token, 'status=pending,approved');
  dispatch(setPendingApprovedReservations(res.data || []));
};

export default reservationsSlice.reducer;
