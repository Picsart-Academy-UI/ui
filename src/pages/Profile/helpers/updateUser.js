import { useSelector } from 'react-redux';
import useRequest from '../../../hooks/useFetch';
import { getUserUpdateRequestData } from '../../../services/users';

const useUpdateUserHook = () => {
  const makeRequest = useRequest();
  const token = useSelector((state) => state.signin.token);
  const update = async (edited) => {
    await makeRequest(
      getUserUpdateRequestData({ token, id: edited._id, body: edited })
    );
  };
  return update;
};

export default useUpdateUserHook;
