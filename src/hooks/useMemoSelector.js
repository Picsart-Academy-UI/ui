import { useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

const useMemoSelector = (callback) => useSelector(callback, isEqual);

export default useMemoSelector;
