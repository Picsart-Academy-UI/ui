import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getChairs = (token, query) => {
  makeRequest(`chairs?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
