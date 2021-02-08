import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'usersData',
  initialState: {
    usersList: {},
    isLoading: false,
    page: 0,
    rowsPerPage: 5,
    selectedTeamId: '',
  },
  reducers: {
    fetchedUsersList: (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false;
    },
    setSelectedTeamId: (state, action) => {
      state.selectedTeamId = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    handleIsLoadingChange: (state) => {
      state.isLoading = true;
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      const index = state.usersList.data.findIndex(({ _id }) => userId === _id);
      state.usersList.data.splice(index, 1);
      state.isLoading = false;
      state.usersList.count--; // eslint-disable-line
    },
  },
});

export const {
  fetchedUsersList,
  deleteUser,
  handleIsLoadingChange,
  setSelectedTeamId,
  setPage,
  setRowsPerPage,
} = usersSlice.actions;

export const getUsers = ({ users }) => users;

export default usersSlice.reducer;
