import { createSlice } from '@reduxjs/toolkit';

export const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoggedIn: false,
    token: '',
  },
  reducers: {
    setIsLoggedIn: (state, token) => {
      state.isLoggedIn = true;
      state.token = token;
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = signinSlice.actions;

export default signinSlice.reducer;
