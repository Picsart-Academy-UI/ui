import { MAIN_URL } from '../../constants';

export const getChairCreateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}chairs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getChairsAllRequestData = (token) =>
  new Request(`${MAIN_URL}chairs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getChairIdRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}chairs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getChairUpdateRequestData = ({ token, id, body }) =>
  new Request(`${MAIN_URL}chairs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getChairDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}chairs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
