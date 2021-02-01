import makeRequest from '../utils/makeRequest';
import { MAIN_URL } from '../constants';

const getGoogleRequestData = (response) =>
  new Request(`${MAIN_URL}auth/signin/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: response.tokenId,
    }),
  });

export default getGoogleRequestData;

export const logout = (token, endpoint) =>
  makeRequest('auth/logout', {
    method: 'POST',
    body: { endpoint },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
