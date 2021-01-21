import { Box, TextField } from '@material-ui/core';

const SearchBox = ({ value, onChange, onPageChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
    onPageChange(0);
  };

  return (
    <Box mt={2} ml={30}>
      <TextField
        onChange={handleInputChange}
        name="searchTeam"
        value={value}
        id="searchTeam"
        placeholder="Search by name"
        autoFocus
      />
    </Box>
  );
};

export default SearchBox;
