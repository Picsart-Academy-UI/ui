import { createSlice } from '@reduxjs/toolkit';

export const teams = createSlice({
  name: 'teamsData',
  initialState: {
    teamsList: [],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teamsList = action.payload.data;
    },
    addTeam: (state, action) => {
      state.teamList = [action.payload.data, ...state.teamList];
    },
    deleteTeam: (state, action) => {
      state.teamsList = state.teamsList.filter(
        (team) => team.id !== action.payload.id
      );
    },
  },
});

export const { setTeams, addTeam, deleteTeam } = teams.actions;

export default teams.reducer;
