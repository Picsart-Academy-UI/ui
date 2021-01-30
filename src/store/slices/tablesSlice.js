import { createSlice } from '@reduxjs/toolkit';

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

export default tablesSlice.reducer;
