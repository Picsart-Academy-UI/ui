import { MAIN_ROUTE } from '../../constants';

const getAllTeams = (token, id) => ({
  url: `${MAIN_ROUTE}users/${id}`,
  options: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default getAllTeams;
