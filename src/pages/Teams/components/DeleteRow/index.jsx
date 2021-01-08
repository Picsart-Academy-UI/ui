import { Button } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const DeleteRow = () => {
  const handleDeleteClick = () => {};

  return (
    <Button title="Delete" onClick={handleDeleteClick} color="secondary">
      <DeleteOutlineIcon />
    </Button>
  );
};

export default DeleteRow;
