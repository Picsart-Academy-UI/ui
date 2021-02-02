import { createSlice } from '@reduxjs/toolkit';
import makeFetch from '../../services';
import {
  getTablesAllRequestData,
  getTablesQueryRequestData,
} from '../../services/tablesService';

export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    chairs: [],
    tables: [],
  },
  reducers: {
    setTables: (state, action) => {
      state.tables = action.payload.data;
    },
    deleteTable: (state, action) => {
      state.tables = state.tables.filter(
        (table) => table._id !== action.payload.id
      );
    },
    addTable: (state, action) => {
      state.tables.push(action.payload);
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

export const {
  setTables,
  setChairs,
  deleteTable,
  addTable,
} = tablesSlice.actions;

export const fetchTables = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.tables.tables?.length) {
    return;
  }
  const res = await makeFetch(getTablesAllRequestData(token));
  dispatch(setTables(res || []));
};

export const fetchChairs = (token, team_id) => async (dispatch) => {
  const res = await makeFetch(getTablesQueryRequestData({ token, team_id }));
  dispatch(setChairs(res?.data || []));
};

export default tablesSlice.reducer;
