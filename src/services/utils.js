import store from '../store';

export const getHeaders = () => {
  new Headers({
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${store.getState().signin.token}`,
  });
};
