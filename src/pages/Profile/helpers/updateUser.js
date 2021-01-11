import { useSelector } from 'react-redux';
import useRequest from '../../../hooks/useFetch';
import updateUser from '../../../services/profile/updateUser';

const useUpdateUserHook = () => {
  const makeRequest = useRequest();
  const token = useSelector((state) => state.signin.token);
  const update = async (edited) => {
    const { url, options } = updateUser(token, edited._id, edited);
    await makeRequest(url, options);
  };
  return update;
};

export default useUpdateUserHook;
