import { MAIN_URL } from '../constants';

export const getPOSTRequestObject = ({ token, body, route }) =>
  new Request(`${MAIN_URL}${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getPUTRequestObject = ({ token, id, body, route }) =>
  new Request(`${MAIN_URL}${route}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getGETRequestObject = ({ token, route }) =>
  new Request(`${MAIN_URL}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getGETOneRequestObject = ({ token, id, route }) =>
  new Request(`${MAIN_URL}${route}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDELETERequestObject = ({ token, id, route }) =>
  new Request(`${MAIN_URL}${route}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
