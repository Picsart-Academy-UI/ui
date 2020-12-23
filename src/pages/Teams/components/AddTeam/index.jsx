import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const AddTeam = () => {
  const handleAddClick = () => {};

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mr={3} m={1}>
        <Button onClick={handleAddClick} color="primary" variant="contained">
          Add Team
        </Button>
      </Box>
    </Box>
  );
};

export default AddTeam;
