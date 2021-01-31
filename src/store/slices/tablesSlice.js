import { createSlice } from '@reduxjs/toolkit';
import { getTables } from '../../services/tablesService';

export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    tablesList: [],
  },
  reducers: {
    setTables: (state, action) => {
      state.tablesList = action.payload.data;
    },
  },
});

export const { setTables } = tablesSlice.actions;

export const fetchTables = (token) => async (dispatch, getState) => {
  const state = getState();
  if (state.tables.tablesList?.length) {
    return;
  }
  const res = await getTables(token);
  dispatch(setTables(res || []));
};

export default tablesSlice.reducer;
