import { createSlice } from '@reduxjs/toolkit';
import makeFetch from '../../services';
import { logout } from '../../services/authService';

export const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoggedIn: false,
    token: '',
    curUser: null,
    pushSubscriptionEndpoint: '',
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.curUser = action.payload.data;
    },
    setChangeCurUser: (state, action) => {
      state.curUser = action.payload;
    },
    setIsLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
    addPushSubscription: (state, action) => {
      state.curUser.push_subscriptions.push(action.payload);
    },
    addCurrentPushSubscription: (state, action) => {
      state.pushSubscriptionEndpoint = action.payload.endpoint;
    },
    removePushSubscription: (state, action) => {
      state.curUser.push_subscriptions = state.curUser.push_subscriptions.filter(
        (p) => p.endpoint !== action.payload
      );
    },
  },
});

export const {
  setIsLoggedIn,
  setIsLoggedOut,
  setChangeCurUser,
  addPushSubscription,
  addCurrentPushSubscription,
  removePushSubscription,
} = signinSlice.actions;

export const logoutAction = (token) => async (dispatch, getState) => {
  const state = getState();
  const endpoint = state.signin.pushSubscriptionEndpoint;
  dispatch(setIsLoggedOut());
  dispatch(removePushSubscription(endpoint));
  await makeFetch(logout({ token, endpoint }));
};

export default signinSlice.reducer;
