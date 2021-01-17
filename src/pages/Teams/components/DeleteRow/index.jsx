import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { getTeamDeleteRequestData } from '../../../../services/teams';
import { deleteTeam } from '../../../../store/slices/teamsSlice';

const DeleteRow = ({ id }) => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const dispatch = useDispatch();

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    try {
      await makeRequest(getTeamDeleteRequestData({ token, id }));
      dispatch(deleteTeam({ id }));
    } catch (error) {
      console.log('An error occured while deleting the team', error);
    }
  };

  return (
    <Button title="Delete" onClick={handleDeleteClick} color="secondary">
      <DeleteOutlineIcon />
    </Button>
  );
};

export default DeleteRow;
