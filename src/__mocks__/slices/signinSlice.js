import { createSlice } from '@reduxjs/toolkit';

export const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoggedIn: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY5YWJiYWQxNWIxOGEzMzBiYjU3OGEiLCJlbWFpbCI6InJvbWFuLmJhbGF5YW5AcGljc2FydC5jb20iLCJ0ZWFtX2lkIjoiNWZlMjNkNTRhNzEwZWI1MmE5ZmUwODM1IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTYxMDE5ODM3Mn0.yKoYaQRwuCDjn2kSsJ-nbd2t76spzoaw3kscLsYCi-c',
    curUser: {
      _id: '5ff9abbad15b18a330bb578a',
      is_admin: true,
      created_at: '2021-01-09T13:01:13.313Z',
      updated_at: '2021-01-09T13:01:13.313Z',
      email: 'roman.balayan@picsart.com',
      team_id: '5fe23d54a710eb52a9fe0835',
      first_name: 'Roma',
      last_name: 'Balayan',
      __v: 0,
      accepted: true,
      profile_picture: null,
      updatedAt: '2021-01-09T15:06:58.831Z',
    },
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.curUser = action.payload.data;
    },
    setChangeCurUser: (state, action) => {
      state.curUser = action.payload;
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = signinSlice.actions;

export default signinSlice.reducer;
