import { createSlice } from '@reduxjs/toolkit';
import { getTeams } from '../../services/teamsService';

export const teamsSlice = createSlice({
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

export const { setTeams } = teamsSlice.actions;

export const fetchTeams = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.teams.teams?.length) {
    return;
  }
  const res = await getTeams(token);
  dispatch(setTeams(res.data || []));
};

export default teamsSlice.reducer;
