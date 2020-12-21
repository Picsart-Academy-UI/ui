import { createSlice } from '@reduxjs/toolkit';

export const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = signinSlice.actions;

export default signinSlice.reducer;
