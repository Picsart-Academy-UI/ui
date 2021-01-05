import { MAIN_ROUTE } from '../../constants';

export const getUserInvitationRequestData = ({ token, body }) => ({
  url: `${MAIN_ROUTE}auth/invite`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body,
  },
});

export const getLimitedUsersData = (token, limit, page) => ({
  url: `${MAIN_ROUTE}users/all?limit=${limit}&page=${page}`,
  options: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  },
});
