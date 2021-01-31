import { batch, useDispatch } from 'react-redux';
import { useCallback } from 'react';

const useBatchDispatch = () => {
  const dispatch = useDispatch();
  return useCallback(
    (...actions) => batch(() => actions.forEach((action) => dispatch(action))),
    [dispatch]
  );
};

export default useBatchDispatch;
