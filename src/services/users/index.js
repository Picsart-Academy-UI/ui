import { MAIN_URL } from '../../constants';

export const getUserInvitationRequestData = ({ token, body }) =>
  new Request(`${MAIN_URL}auth/invite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getUserUpdateRequestData = ({ token, id, body }) =>
  new Request(`${MAIN_URL}users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const getLimitedUsersRequestData = (token, limit, page, isAdmin) =>
  new Request(
    `${MAIN_URL}users${isAdmin ? `/all?limit=${limit}&page=${page}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getUserDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getFilteredUsersRequestData = (
  token,
  limit,
  page,
  teamId,
  value
) =>
  new Request(
    `${MAIN_URL}users/all?${teamId ? `team_id=${teamId}` : ''}${
      value ? `&first_name=${value}` : ''
    }&limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
