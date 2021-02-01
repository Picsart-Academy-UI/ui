import { useSelector } from 'react-redux';
import makeFetch from '../../../services';
import { getUserUpdateRequestData } from '../../../services/users';

const useUpdateUserHook = () => {
  const token = useSelector((state) => state.signin.token);
  const update = async (edited) => {
    await makeFetch(
      getUserUpdateRequestData({ token, id: edited._id, body: edited })
    );
  };
  return update;
};

export default useUpdateUserHook;
