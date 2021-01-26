import makeRequest from '../utils/makeRequest';
// eslint-disable-next-line
export const getTeams = (token) =>
  makeRequest('teams', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
