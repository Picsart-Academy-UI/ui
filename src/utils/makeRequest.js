import { MAIN_ROUTE } from '../constants';

const makeRequest = async (url, { body, headers, method }) => {
  try {
    const res = await fetch(`${MAIN_ROUTE}${url}`, {
      body: JSON.stringify(body) || undefined,
      headers: headers || {},
      method: method || 'GET',
    });

    return await res.json();
  } catch (err) {
    return new Error(err.message);
  }
};

export default makeRequest;
