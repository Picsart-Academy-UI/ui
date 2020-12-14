import { configureStore } from '@reduxjs/toolkit';
import testReducer from './slices/TestSlice';

export default configureStore({
  reducer: {
    test: testReducer,
  },
});
