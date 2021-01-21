import { MAIN_URL } from '../../constants';

export const getTeamCreateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getTeamsAllRequestData = (token) =>
  new Request(`${MAIN_URL}teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTeambyIDRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}teams/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTeamUpdateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}teams/${body.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getTeamDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}teams/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
