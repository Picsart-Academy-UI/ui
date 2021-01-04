import { createSlice } from '@reduxjs/toolkit';

// export const getUsers = createAsyncThunk(
//     'users/fetchUsers',
//     async (token, limit, page) => {
//         const { url, options } = getLimitedUsersData(token, limit, page);
//         const result = await makeRequest(url, options);
//         console.log("users",result)
//         return result;
//     }
// )

export const usersSlice = createSlice({
  name: 'usersData',
  initialState: {
    usersList: [],
  },
  reducers: {
    fetchedUsersList: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { fetchedUsersList } = usersSlice.actions;

export const getUsers = ({ users }) => users;

export default usersSlice.reducer;
