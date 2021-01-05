import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';

const GoToProfile = (props) => {
  const { user } = props;

  return (
    <Button title="Profile" color="primary">
      <Link to={{ pathname: `/profile/${user._id}`, user }}>
        <AccountCircleOutlinedIcon />
      </Link>
    </Button>
  );
};

export default GoToProfile;
