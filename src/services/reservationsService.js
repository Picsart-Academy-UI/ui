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
  console.log(body);
  return makeRequest(`reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body,
  });
};
export const deleteReservation = (token, resId) =>
  makeRequest(`reservations/${resId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });
