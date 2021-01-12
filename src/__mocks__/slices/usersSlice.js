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
    usersList: [
      {
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
    ],
  },
  reducers: {
    fetchedUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      const index = state.usersList.users.findIndex(
        ({ _id }) => userId === _id
      );
      state.usersList.users.splice(index, 1);
    },
  },
});

export const { fetchedUsersList, deleteUser } = usersSlice.actions;

export const getUsers = ({ users }) => users;

export default usersSlice.reducer;
