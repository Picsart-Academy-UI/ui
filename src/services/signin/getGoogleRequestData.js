import { MAIN_ROUTE } from '../../constants';

const getGoogleRequestData = (response) => ({
  url: `${MAIN_ROUTE}auth/signin/`,
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      token: response.tokenId,
    },
  },
});

export default getGoogleRequestData;
