import { createSlice } from '@reduxjs/toolkit';
import { getTeams } from '../../services/teamsService';

export const teamsSlice = createSlice({
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

export const { setTeams, addTeam, deleteTeam } = teamsSlice.actions;

export const fetchTeams = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.teams.teams?.length) {
    return;
  }
  const res = await getTeams(token);
  dispatch(setTeams(res || []));
};

export default teamsSlice.reducer;
