import { createSlice } from '@reduxjs/toolkit';
import { getTables } from '../../services/tablesService';

export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
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
  },
});

export const { setTables, deleteTable, addTable } = tablesSlice.actions;

export const fetchTables = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.tables.tables?.length) {
    return;
  }
  const res = await getTables(token);
  dispatch(setTables(res || []));
};

export default tablesSlice.reducer;
