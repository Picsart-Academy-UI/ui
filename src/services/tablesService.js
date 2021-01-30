import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getTables = (token) =>
  makeRequest('tables', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
