import { MAIN_ROUTE } from '../../constants';

const getLimitedUsersData = (token, limit, page) => ({
  url: `${MAIN_ROUTE}users/all?limit=${limit}&page=${page}`,
  options: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  },
});

export default getLimitedUsersData;
