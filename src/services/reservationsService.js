import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getReservations = (token, query) =>
  makeRequest(`reservations?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// eslint-disable-next-line
export const postReservation = (token, body) => {
  makeRequest(`reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body,
  });
};
