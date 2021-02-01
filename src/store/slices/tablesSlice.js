import { createSlice } from '@reduxjs/toolkit';
import { getTables, getTablesQuery } from '../../services/tablesService';

export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    tablesList: [],
    chairs: [],
  },
  reducers: {
    setTables: (state, action) => {
      state.tablesList = action.payload.data;
    },
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

export const { setTables, setChairs } = tablesSlice.actions;

export const fetchTables = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.tables.tablesList?.length) {
    return;
  }
  const res = await getTables(token);
  dispatch(setTables(res || []));
};

export const fetchChairs = (token, team_id) => async (dispatch) => {
  const res = await getTablesQuery(token, team_id);
  dispatch(setChairs(res?.data || []));
};

export default tablesSlice.reducer;
