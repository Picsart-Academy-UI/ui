import { MAIN_ROUTE } from '../../constants';

const getAllTeams = (token, id, body) => ({
  url: `${MAIN_ROUTE}users/${id}`,
  options: {
    body,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  },
});

export default getAllTeams;
