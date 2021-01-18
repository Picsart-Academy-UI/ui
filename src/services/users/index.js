import { MAIN_URL } from '../../constants';
import {
  getPOSTRequestObject,
  getPUTRequestObject,
  getDELETERequestObject,
} from '../utils';

export const getUserInvitationRequestData = ({ token, body, route }) =>
  getPOSTRequestObject({ token, body, route });

export const getUsersUpdateRequestData = ({ token, id, body, route }) =>
  getPUTRequestObject({ token, id, body, route });

export const getLimitedUsersRequestData = (token, limit, page) =>
  new Request(`${MAIN_URL}users/all?limit=${limit}&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserDeleteRequestData = ({ token, id, route }) =>
  getDELETERequestObject({ token, id, route });

export const getUsersSearchRequestData = (token, limit, page, value) =>
  new Request(
    `${MAIN_URL}users/search?search_by=first_name&value=${value}&limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
