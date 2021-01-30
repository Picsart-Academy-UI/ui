import { createSlice } from '@reduxjs/toolkit';

export const chairSlice = createSlice({
  name: 'chair',
  initialState: {
    chairs: [],
  },
  reducers: {
    setChairs: (state, action) => {
      state.chairs = action.payload;
    },
  },
});

export default chairSlice.reducers;
