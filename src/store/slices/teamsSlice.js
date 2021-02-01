import { createSlice } from '@reduxjs/toolkit';
import { getTeamsAllRequestData } from '../../services/teams';

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
    updateTeam: (state, action) => {
      state.teams.push(action.payload);
    },
    deleteTeam: (state, action) => {
      state.teams = state.teams.filter(
        (team) => team._id !== action.payload.id
      );
    },
  },
});

export const { setTeams, addTeam, updateTeam, deleteTeam } = teams.actions;

export const fetchTeams = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.teams.teams?.length) {
    return;
  }
  const res = await getTeamsAllRequestData(token);
  if (res.data) {
    dispatch(setTeams(res || []));
  }
};

export default teams.reducer;
