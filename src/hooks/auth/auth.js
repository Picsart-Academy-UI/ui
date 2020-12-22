import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';

export const useRequest = () => {
  const makeRequest = useCallback(async (url, method, body, headers = {}) => {
    try {
      if (body) body = JSON.stringify(body);

      headers['Content-Type'] = 'application/json';

      const res = await fetch(url, { method, body, headers });

      const result = await res.json();

      if (!res.ok) {
        console.log(result);
      } else {
        console.log('failure');
      }

      return result;
    } catch (e) {
      console.log(e.message);
    }
    return 0;
  }, []);
  return { makeRequest };
};
