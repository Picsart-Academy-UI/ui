import { useRef } from 'react';

const useDebounce = (callback, delay) => {
  const ref = useRef();
  return (...params) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => callback(...params), delay);
  };
};

export default useDebounce;
