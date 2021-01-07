import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const AddTeam = () => {
  const history = useHistory();

  const handleAddClick = () => {
    history.push('/teams/create');
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mr={3} m={1}>
        <Button onClick={handleAddClick} color="primary" variant="contained">
          Add a Team
        </Button>
      </Box>
    </Box>
  );
};

export default AddTeam;
