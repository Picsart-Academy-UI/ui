import makeRequest from '../utils/makeRequest';

export const getTeams = (token) =>
  makeRequest('teams', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
