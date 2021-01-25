import makeRequest from '../utils/makeRequest';

export const getSingleUser = (token, id) =>
  makeRequest(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
