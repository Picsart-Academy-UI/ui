import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const EditRow = () => {
  const handleEditClick = () => {};
  return (
    <Button title="Edit" onClick={handleEditClick} color="primary">
      <EditOutlinedIcon />
    </Button>
  );
};

export default EditRow;
