import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useStylesMain from '../../../../hooks/useStylesMain';
import makeFetch from '../../../../services';
import { getUserDeleteRequestData } from '../../../../services/usersService';
import { deleteUser } from '../../../../store/slices/usersSlice';
import AlertDialog from '../../../../components/AlertDialog';

const DeleteUser = ({ id, userFullName, onDelete }) => {
  const classesMain = useStylesMain();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.signin.token);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteClick = async () => {
    const res = await makeFetch(getUserDeleteRequestData({ token, id }));
    if (res.message) {
      handleClose();
      dispatch(deleteUser(id));
      onDelete();
    }
  };

  const titleText = <span>Delete {userFullName} account?</span>;

  return (
    <>
      <Button title="Delete" onClick={handleClickOpen} color="secondary">
        <DeleteOutlineIcon className={classesMain.iconColorRed} />
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

export default DeleteUser;
