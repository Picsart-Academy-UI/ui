import { MAIN_URL } from '../constants';
import makeRequest from '../utils/makeRequest';
import { getHeaders } from './utils';

export const getTables = (token) =>
  makeRequest('tables', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTablesQuery = (token, team_id) =>
  makeRequest(`tables/all?team_id=${team_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTableDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}tables/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });

export const getTablesAllRequestData = (token) =>
  new Request(`${MAIN_URL}tables/all`, {
    headers: getHeaders(token),
  });

export const getTableCreateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}tables`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
