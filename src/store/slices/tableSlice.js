import { createSlice } from '@reduxjs/toolkit';
import { getTables } from '../../services/tableService';

export const tables = createSlice({
  name: 'tables',
  initialState: {
    chairs: [],
  },
  reducers: {
    setChairs: (state, action) => {
      const chairArr = [];
      action.payload.map((table) =>
        table.chairs.map((chair) =>
          chairArr.push({
            table_id: table._id,
            table_number: table.table_number,
            _id: chair._id,
            chair_number: chair.chair_number,
          })
        )
      );
      state.chairs = chairArr;
    },
  },
});

export const { setChairs } = tables.actions;

export const fetchTables = (token, team_id) => async (dispatch) => {
  const res = await getTables(token, team_id);
  dispatch(setChairs(res?.data || []));
};

export default tables.reducer;
