import { createSlice } from '@reduxjs/toolkit';
import { getReservations } from '../../services/reservationsService';

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
  },
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
    setPendingReservations: (state, action) => {
      state.pendingReservations = action.payload;
    },
  },
});

export const {
  setReservations,
  setPendingReservations,
} = reservationsSlice.actions;

export const fetchReservations = (token) => async (dispatch) => {
  const res = await getReservations(token);
  dispatch(setReservations(res.data || []));
};

export const fetchPendingReservations = (token) => async (dispatch) => {
  const res = await getReservations(token, 'status=pending');
  dispatch(setPendingReservations(res.data || []));
};
export default reservationsSlice.reducer;
