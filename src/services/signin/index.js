import { MAIN_URL } from '../../constants';

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
