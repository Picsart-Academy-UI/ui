import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'notme',
  initialState: {
    notme: {
      _id: '1',
      is_admin: true,
      created_at: '2021-01-09T13:01:13.313Z',
      updated_at: '2021-01-09T13:01:13.313Z',
      email: 'roman.balayan@picsart.com',
      team_id: '1',
      first_name: 'Roma',
      last_name: 'Balayan',
      __v: 0,
      accepted: true,
      profile_picture: null,
      updatedAt: '2021-01-09T15:06:58.831Z',
    },
  },
  reducers: {
    setNotMe: (state, action) => {
      state.notme = action.payload;
    },
  },
});

export const { setNotMe } = profileSlice.actions;

export default profileSlice.reducer;
