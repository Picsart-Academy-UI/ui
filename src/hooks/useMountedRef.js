import { useRef, useEffect } from 'react';

const useMountedRef = () => {
  const ref = useRef(true);

  useEffect(
    () => () => {
      ref.current = false;
    },
    []
  );

  return ref;
};

export default useMountedRef;
