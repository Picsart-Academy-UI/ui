const getGoogleRequestData = (response) => ({
  url: 'http://localhost:6789/api/v1/auth/signin/',
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
