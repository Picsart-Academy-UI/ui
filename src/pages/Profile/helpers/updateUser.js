import { useSelector } from 'react-redux';
import { getUsersUpdateRequestData } from '../../../services/users';
import { API_URL_PART } from '../../../constants';
import useRequest from '../../../hooks/useFetch';

const useUpdateUserHook = () => {
  const makeRequest = useRequest();
  const token = useSelector((state) => state.signin.token);
  const update = async (edited) => {
    await makeRequest(
      getUsersUpdateRequestData({
        token,
        id: edited._id,
        body: edited,
        route: API_URL_PART.users,
      })
    );
  };
  return update;
};

export default useUpdateUserHook;
