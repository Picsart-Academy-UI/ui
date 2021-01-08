import { MAIN_ROUTE } from '../../constants';

const getAllTeams = (token, id) => ({
  url: `${MAIN_ROUTE}users/${id}`,
  options: {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  },
});

export default getAllTeams;
