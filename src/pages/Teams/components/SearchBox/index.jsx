import { TextField, Box } from '@material-ui/core';

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
