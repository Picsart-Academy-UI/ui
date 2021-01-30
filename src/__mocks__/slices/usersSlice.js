import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'usersData',
  initialState: {
    usersList: [
      {
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
    ],
  },
  reducers: {
    fetchedUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    deleteUser: jest.fn((state, action) => {
      const userId = action.payload;
      const index = state.usersList.users.findIndex(
        ({ _id }) => userId === _id
      );
      state.usersList.users.splice(index, 1);
    }),
  },
});

export const { fetchedUsersList, deleteUser } = usersSlice.actions;

export const getUsers = ({ users }) => users;

export default usersSlice.reducer;
