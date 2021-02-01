// import store from '../store';

// eslint-disable-next-line
export const getHeaders = (token) =>
  new Headers({
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${token}`,
  });
