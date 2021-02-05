import { MAIN_URL } from '../constants';
import { getHeaders } from './utils';

export const getTablesQueryRequestData = ({ token, team_id }) =>
  new Request(`${MAIN_URL}tables?team_id=${team_id}`, {
    headers: getHeaders(token),
  });

export const getTableDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}tables/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });

export const getTablesAllRequestData = (token) =>
  new Request(`${MAIN_URL}tables`, {
    headers: getHeaders(token),
  });

export const getTableCreateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}tables`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
