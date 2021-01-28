import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import useStylesMain from '../../../../hooks/useStylesMain';

const GoToProfile = ({ user }) => {
  const classesMain = useStylesMain();

  const history = useHistory();
  const { _id } = user;

  const handleClick = () => {
    history.push(`/profile/${_id}`, user);
  };

  return (
    <Button title="Profile" color="primary" onClick={handleClick}>
      <AccountCircleOutlinedIcon className={classesMain.iconColorBlue} />
    </Button>
  );
};

export default GoToProfile;
