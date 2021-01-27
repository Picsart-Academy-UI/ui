import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'usersData',
  initialState: {
    usersList: {},
  },
  reducers: {
    fetchedUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      const index = state.usersList.data.findIndex(({ _id }) => userId === _id);
      state.usersList.data.splice(index, 1);
      state.usersList.count--; // eslint-disable-line
    },
  },
});

export const { fetchedUsersList, deleteUser, searchUser } = usersSlice.actions;

export const getUsers = ({ users }) => users;

export default usersSlice.reducer;
