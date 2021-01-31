import { useRef } from 'react';

const useDebounce = (callback, delay) => {
  console.log({ callback });
  const ref = useRef();
  return (...params) => {
    // recieving (page + 1, rowsPerPage, selectedTeamId, value)
    clearTimeout(ref.current);
    ref.current = setTimeout(() => callback(...params), delay);
  };
};

export default useDebounce;

//  ref.current = setTimeout(callback, delay);
//     clearTimeout(ref.current);

// useEffect(() => {
//     ref.current = setTimeout(callback, delay);
//     return () => {
//         clearTimeout(ref.current);
//     }
// }, [])
