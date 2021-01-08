import { createSlice } from '@reduxjs/toolkit';
import { getTeams } from '../../services/teamsService';

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    teamsList: [],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teamsList = action.payload;
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export const fetchTeams = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.teams.teamsList.length) {
    return;
  }
  const res = await getTeams(token);
  dispatch(setTeams(res.teams));
};

export default teamsSlice.reducer;
