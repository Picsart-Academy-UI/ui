import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { API_URL_PART } from '../../../../constants';
import useFetch from '../../../../hooks/useFetch';
import { getUserDeleteRequestData } from '../../../../services/users';
import { deleteUser } from '../../../../store/slices/usersSlice';
import AlertDialog from '../../../../components/AlertDialog';

const Delete = ({ id, userFullName }) => {
  const dispatch = useDispatch();
  const makeRequest = useFetch();
  const token = useSelector((state) => state.signin.token);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = async () => {
    const res = await makeRequest(
      getUserDeleteRequestData({ token, id, route: API_URL_PART.users })
    );
    if (res.message) {
      dispatch(deleteUser(id));
      handleClose();
    }
  };

  const titleText = (
    <span>
      Delete&nbsp;&nbsp;<span>{userFullName}</span>&nbsp;&nbsp;account?
    </span>
  );

  return (
    <>
      <Button title="Delete" onClick={handleClickOpen} color="secondary">
        <DeleteOutlineIcon />
      </Button>
      <AlertDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleDeleteClick={handleDeleteClick}
        titleText={titleText}
      />
    </>
  );
};

export default Delete;
