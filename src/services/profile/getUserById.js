import { MAIN_URL } from '../../constants';

const getAllTeams = (token, id) =>
  new Request(`${MAIN_URL}users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default getAllTeams;
