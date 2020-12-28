import { useCallback } from 'react';

const useRequest = () => {
  const makeRequest = useCallback(async (url, method, body, headers = {}) => {
    try {
      if (body) body = JSON.stringify(body);

      headers['Content-Type'] = 'application/json';

      const res = await fetch(url, { method, body, headers });

      const result = await res.json();

      if (res.ok) {
        console.log('Success');
      } else {
        console.log(`Error message: ${res.message}`);
      }

      return result;
    } catch (e) {
      console.log(
        `The following error occured during http request: ${e.message}`
      );
    }

    return -1;
  }, []);
  return { makeRequest };
};

export default useRequest;
