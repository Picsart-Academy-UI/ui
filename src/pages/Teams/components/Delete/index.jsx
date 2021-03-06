import { useState } from 'react';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import useStylesMain from '../../../../hooks/useStylesMain';
import makeFetch from '../../../../services';
import { getTeamDeleteRequestData } from '../../../../services/teamsService';
import { deleteTeam } from '../../../../store/slices/teamsSlice';
import AlertDialog from '../../../../components/AlertDialog';

const Delete = ({ id, name, membersCount }) => {
  const classesMain = useStylesMain();
  const token = useSelector((state) => state.signin.token);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteClick = async () => {
    const res = await makeFetch(getTeamDeleteRequestData({ token, id }));
    if (res.message) {
      handleClose();
      dispatch(deleteTeam({ id }));
    }
  };

  const titleText = <span>Delete {name}?</span>;

  return (
    <>
      <Button
        title="Delete"
        onClick={handleClickOpen}
        color="secondary"
        disabled={!!membersCount}
      >
        <DeleteOutlineIcon
          className={!membersCount ? classesMain.iconColorRed : ''}
        />
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
