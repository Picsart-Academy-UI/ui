import { useState } from 'react';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import useStylesMain from '../../../../hooks/useStylesMain';
import makeFetch from '../../../../services';
import { getTableDeleteRequestData } from '../../../../services/tables';
import AlertDialog from '../../../../components/AlertDialog';
import { deleteTable } from '../../../../store/slices/tablesSlice';

const Delete = ({ id, name }) => {
  const classesMain = useStylesMain();
  const token = useSelector((state) => state.signin.token);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteClick = async () => {
    const res = await makeFetch(getTableDeleteRequestData({ token, id }));
    if (res.message) {
      handleClose();
      dispatch(deleteTable({ id }));
    }
  };

  const titleText = <span>Delete {name}?</span>;

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

export default Delete;
