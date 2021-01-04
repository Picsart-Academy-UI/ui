import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'notme',
  initialState: {
    notme: null,
  },
  reducers: {
    setNotMe: (state, action) => {
      state.notme = action.payload;
    },
  },
});

export const { setNotMe } = profileSlice.actions;

export default profileSlice.reducer;
