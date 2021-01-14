import { createSlice } from '@reduxjs/toolkit';

export const teams = createSlice({
  name: 'teams',
  initialState: {
    teams: [],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = teams.actions;

export default teams.reducer;
