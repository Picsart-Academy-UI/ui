import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getSingleUser = (token, id) =>
  makeRequest(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
