import { Button } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';

const GoToProfile = ({ user }) => {
  const { _id } = user;

  return (
    <Button title="Profile" color="primary">
      <Link to={{ pathname: `/profile/${_id}`, user }}>
        <AccountCircleOutlinedIcon />
      </Link>
    </Button>
  );
};

export default GoToProfile;
