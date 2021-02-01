import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getTables = (token) =>
  makeRequest('tables', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTablesQuery = (token, team_id) =>
  makeRequest(`tables/all?team_id=${team_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
