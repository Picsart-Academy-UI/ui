import { Button } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../../../hooks/useStylesMain';

const Edit = ({ id, name }) => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/teams/edit/${id}`, name);
  };
  return (
    <Button title="Edit" onClick={handleEditClick} color="primary">
      <EditOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default Edit;
