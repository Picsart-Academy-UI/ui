import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

const AddUser = () => {
  const history = useHistory();
  const onAddUserClick = () => history.push('/users/invite');

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mr={3} m={1}>
        <Button onClick={onAddUserClick} color="primary" variant="contained">
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default AddUser;
