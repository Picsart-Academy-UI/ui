import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import testReducer from './slices/TestSlice';
import signinReducer from './slices/signinSlice'; // aa
import usersReducer from './slices/usersSlice';
import profileReducer from './slices/profileSlice';
import teamsReducer from './slices/teamsSlice';

export const reducers = combineReducers({
  test: testReducer,
  signin: signinReducer,
  users: usersReducer,
  profile: profileReducer,
  teams: teamsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['signin', 'profile'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
