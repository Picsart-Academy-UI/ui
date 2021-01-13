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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export const getUserDeleteRequestData = ({ token, id }) => ({
  url: `${MAIN_ROUTE}users/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export const getUsersBySearch = ({ token, limit, page, value }) => ({
  url: `${MAIN_ROUTE}users/search?search_by=first_name&value=${value}&limit=${limit}&page=${page}`, // eslint-disable-line
  options: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});
