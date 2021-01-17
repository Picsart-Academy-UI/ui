import { createSlice } from '@reduxjs/toolkit';

export const teams = createSlice({
  name: 'teams',
  initialState: {
    teams: [
      {
        _id: '5feb7310339b0d33d18b7285',
        name: 'team1',
        createdAt: '2020-12-29T18:18:56.188Z',
        updatedAt: '2021-01-14T12:49:19.231Z',
        __v: 0,
        team_name: 'Videoo',
        members_count: 0,
        tables: [
          {
            chairs_count: 6,
            _id: '5fff021d8655a133f07d1a84',
            table_name: 'A',
            team_id: '5feb7310339b0d33d18b7285',
            createdAt: '2021-01-13T14:22:21.655Z',
            updatedAt: '2021-01-13T14:22:21.655Z',
            __v: 0,
          },
          {
            chairs_count: 6,
            _id: '5fff4f9b88323752f8f1b71f',
            table_name: 'B',
            team_id: '5feb7310339b0d33d18b7285',
            createdAt: '2021-01-13T19:52:59.530Z',
            updatedAt: '2021-01-13T19:52:59.530Z',
            __v: 0,
          },
          {
            chairs_count: 12,
            _id: '5fff501888323752f8f1b720',
            table_name: 'Cccc',
            team_id: '5feb7310339b0d33d18b7285',
            createdAt: '2021-01-13T19:55:04.885Z',
            updatedAt: '2021-01-14T12:50:08.784Z',
            __v: 0,
          },
        ],
        id: '5feb7310339b0d33d18b7285',
      },
    ],
  },
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = teams.actions;

export default teams.reducer;
