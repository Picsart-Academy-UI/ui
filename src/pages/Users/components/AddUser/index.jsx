import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import useStylesMain from '../../../../hooks/useStylesMain';

const AddUser = () => {
  const classesMain = useStylesMain();
  const history = useHistory();
  const onAddUserClick = () => history.push('/users/invite');

  return (
    <Button
      onClick={onAddUserClick}
      color="primary"
      variant="contained"
      className={classesMain.commonButton}
    >
      Add User
    </Button>
  );
};

export default AddUser;
