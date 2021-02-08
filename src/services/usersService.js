import { MAIN_URL } from '../constants';
import { getHeaders } from './utils';

export const getUserInvitationRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}auth/invite`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });

export const getUserUpdateRequestData = ({ token, id, body }) =>
  new Request(`${MAIN_URL}users/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });

export const getUserDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}users/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });

export const getLimitedUsersRequestData = (token, limit, page, isAdmin) =>
  new Request(
    `${MAIN_URL}users${isAdmin ? `?limit=${limit}&page=${page}` : ''}`,
    {
      headers: getHeaders(token),
    }
  );

export const getFilteredUsersRequestData = (
  token,
  limit,
  page,
  teamId,
  value
) =>
  new Request(
    `${MAIN_URL}users?${teamId ? `team_id=${teamId}` : ''}${
      value ? `&first_name=${value}` : ''
    }&limit=${limit}&page=${page}`,
    {
      headers: getHeaders(token),
    }
  );
