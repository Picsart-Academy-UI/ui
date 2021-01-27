import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getReservations = (token, query) =>
  makeRequest(`reservations?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
