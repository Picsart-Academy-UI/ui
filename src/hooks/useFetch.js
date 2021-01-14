import { useCallback } from 'react';

const useRequest = () => {
  const makeRequest = useCallback(async (url, { body, headers, method }) => {
    // eslint-disable-line
    try {
      const res = await fetch(url, {
        body: JSON.stringify(body) || undefined,
        headers: headers || {},
        method: method || 'GET',
      });

      const result = await res.json();

      return result;
    } catch (err) {
      console.log(err.message);
    }
    return 0;
  }, []);
  return makeRequest;
};

export default useRequest;
