import { MAIN_URL } from '../../constants';

export const getTableCreateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getTablesAllRequestData = (token) =>
  new Request(`${MAIN_URL}tables`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTableIdRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}tables/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTableUpdateRequestData = ({ token, id, body }) =>
  new Request(`${MAIN_URL}tables/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getTableDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}tables/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
