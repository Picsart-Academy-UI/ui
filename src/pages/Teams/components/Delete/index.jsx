import { useState } from 'react';
import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import { getTeamDeleteRequestData } from '../../../../services/teams';
import { deleteTeam } from '../../../../store/slices/teamsSlice';
import AlertDialog from '../../../../components/AlertDialog';

const Delete = ({ id, name, membersCount }) => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteClick = async () => {
    const res = await makeRequest(getTeamDeleteRequestData({ token, id }));
    if (res.message) {
      dispatch(deleteTeam({ id }));
      handleClose();
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
        startIcon={<DeleteOutlineIcon />}
      />
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
