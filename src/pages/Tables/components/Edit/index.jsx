import { Button } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';
import useStylesMain from '../../../../hooks/useStylesMain';

const Edit = ({ id, name }) => {
  const classesMain = useStylesMain();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tables/edit/${id}`, name);
  };

  return (
    <Button title="Edit" onClick={handleClick} color="primary">
      <EditOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default Edit;
