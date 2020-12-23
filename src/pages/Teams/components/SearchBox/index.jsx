import React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const SearchBox = () => {
  const handleInputChange = () => {};

  return (
    <Box display="flex" justifyContent="center">
      <Box>
        <TextField
          onChange={handleInputChange}
          name="searchTeam"
          id="searchTeam"
          margin="normal"
          placeholder="Search by name"
          autoFocus
        />
      </Box>
    </Box>
  );
};

export default SearchBox;
