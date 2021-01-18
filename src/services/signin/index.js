import { MAIN_URL } from '../../constants';

const getGoogleRequestData = ({ body, route }) =>
  new Request(`${MAIN_URL}${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: body.tokenId,
    }),
  });

export default getGoogleRequestData;
