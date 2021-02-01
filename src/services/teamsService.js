import { MAIN_URL } from '../constants';
import { getHeaders } from './utils';

export const getTeamsAllRequestData = (token) =>
  new Request(`${MAIN_URL}teams`, {
    headers: getHeaders(token),
  });

export const getTeamCreateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}teams`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });

export const getTeamUpdateRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}teams/${body.id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({ team_name: body.team_name }),
  });

export const getTeamDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}teams/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
