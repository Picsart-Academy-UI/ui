import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

const AddUser = () => {
  const history = useHistory();
  const onAddUserClick = () => history.push('/users/invite');

  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Box>
        <Button onClick={onAddUserClick} color="primary" variant="contained">
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default AddUser;
