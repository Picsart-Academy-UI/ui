import makeRequest from '../utils/makeRequest';

export const getTables = (token) =>
  makeRequest('tables', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
