import { createSlice } from '@reduxjs/toolkit';

export const teams = createSlice({
  name: 'teamsData',
  initialState: {
    teams: [],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload.data;
    },
    addTeam: (state, action) => {
      state.teams = [action.payload.data, ...state.teams];
    },
    deleteTeam: (state, action) => {
      state.teams = state.teams.filter(
        (team) => team._id !== action.payload.id
      );
    },
  },
});

export const { setTeams, addTeam, deleteTeam } = teams.actions;

export default teams.reducer;
