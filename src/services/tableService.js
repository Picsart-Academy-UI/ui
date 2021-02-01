import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getTables = (token, team_id) =>
  makeRequest(`tables?team_id=${team_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
