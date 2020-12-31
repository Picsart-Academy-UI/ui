import { useCallback } from 'react';

const useRequest = () => {
  const makeRequest = useCallback(async (url, { body, headers, method }) => {
    try {
      const res = await fetch(url, {
        body: JSON.stringify(body) || undefined,
        headers: headers || {},
        method: method || 'GET',
      });

      const result = await res.json();

      return result;
    } catch (err) {
      return new Error(err.message);
    }
  }, []);
  return makeRequest;
};

export default useRequest;