import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useFetch from '../../../../hooks/useFetch';
import { getUserDeleteRequestData } from '../../../../services/users';
import { deleteUser } from '../../../../store/slices/usersSlice';

const Delete = ({ id }) => {
  const dispatch = useDispatch();
  const makeRequest = useFetch();
  const token = useSelector((state) => state.signin.token);

  const handleDeleteClick = async () => {
    const res = await makeRequest(getUserDeleteRequestData({ token, id }));
    if (res.message) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Button title="Delete" onClick={handleDeleteClick} color="secondary">
      <DeleteOutlineIcon />
    </Button>
  );
};

export default Delete;
