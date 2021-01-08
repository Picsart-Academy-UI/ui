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
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export const getTeambyIDRequestData = ({ token, id }) => ({
  url: `${MAIN_ROUTE}teams/${id}`,
  options: {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export const getTeamUpdateRequestData = ({ token, body }) => ({
  url: `${MAIN_ROUTE}teams/${body.id}`,
  options: {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  },
});

export const getTeamDeleteRequestData = ({ token, id }) => ({
  url: `${MAIN_ROUTE}teams/${id}`,
  options: {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});
