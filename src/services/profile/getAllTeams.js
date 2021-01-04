import { MAIN_ROUTE } from '../../constants';

const getAllTeams = (token) => ({
  url: `${MAIN_ROUTE}/teams`,
  options: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  },
});

export default getAllTeams;
