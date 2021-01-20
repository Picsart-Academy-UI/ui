import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useFetch from '../../../../hooks/useFetch';
import { getUserDeleteRequestData } from '../../../../services/users';
import { deleteUser } from '../../../../store/slices/usersSlice';

const Delete = ({ id }) => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();

  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    const { url, options } = getUserDeleteRequestData({ token, id });
    try {
      const res = await makeRequest(url, options);
      console.log(res);
      if (res.message === 'User has been successfully deleted') {
        dispatch(deleteUser(id));
        return true;
      }
      return false;
    } catch (err) {
      return new Error(err.msg);
    }
  };

  return (
    <Button title="Delete" onClick={handleDeleteClick} color="secondary">
      <DeleteOutlineIcon />
    </Button>
  );
};

export default Delete;
