import { MAIN_ROUTE } from '../../constants';

export const getTeamCreateRequestData = ({ token, body }) => ({
  url: `${MAIN_ROUTE}teams`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body,
  },
});

export const getTeamsAllRequestData = (token) => ({
  url: `${MAIN_ROUTE}teams`,
  options: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});
