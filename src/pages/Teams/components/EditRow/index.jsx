import { Button } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';

const EditRow = ({ id, name }) => {
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/teams/edit/${id}`, name);
  };
  return (
    <Button title="Edit" onClick={handleEditClick} color="primary">
      <EditOutlinedIcon />
    </Button>
  );
};

export default EditRow;
