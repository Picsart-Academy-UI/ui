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

export const getLimitedUsersRequestData = (token, limit, page) =>
  new Request(`${MAIN_URL}users/all?limit=${limit}&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserDeleteRequestData = ({ token, id }) =>
  new Request(`${MAIN_URL}users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUsersSearchRequestData = (token, limit, page, value) =>
  new Request(
    `${MAIN_URL}users/search?search_by=first_name&value=${value}&limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// http://localhost:6789/api/v1/users/all?team_id=600496e14c53f52488b4c898&limit=2&page=0

export const getUsersSelectTeamRequestData = (token, limit, page, teamId) =>
  new Request(
    `${MAIN_URL}users/all?team_id=${teamId}&limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
