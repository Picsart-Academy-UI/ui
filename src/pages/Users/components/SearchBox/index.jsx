import { Box, TextField } from '@material-ui/core';

const SearchBox = () => {
  const handleInputChange = () => {};

  return (
    <Box mt={2}>
      <TextField
        onChange={handleInputChange}
        name="searchTeam"
        id="searchTeam"
        placeholder="Search by name"
        autoFocus
      />
    </Box>
  );
};

export default SearchBox;
