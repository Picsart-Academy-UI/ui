import { useCallback } from 'react';

const useRequest = () => {
  const makeRequest = useCallback(async (requestData) => {
    try {
      const res = await fetch(requestData);

      const result = await res.json();

      return result;
    } catch (err) {
      console.log(err.message);
      return err;
    }
    return 0;
  }, []);
  return makeRequest;
};

export default useRequest;
