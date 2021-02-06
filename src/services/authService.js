import { MAIN_URL } from '../constants';
import { getHeaders } from './utils';

export const getGoogleRequestData = (response) =>
  new Request(`${MAIN_URL}auth/signin/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: response.tokenId,
    }),
  });

export const logout = ({ token, endpoint }) =>
  new Request(`${MAIN_URL}auth/logout/`, {
    method: 'POST',
    body: JSON.stringify({ endpoint }),
    headers: getHeaders(token),
  });
