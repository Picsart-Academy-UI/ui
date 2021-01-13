import { Box, TextField } from '@material-ui/core';

const SearchBox = ({ value, onChange }) => {
  const handleInputChange = (e) => {
    console.log(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Box mt={2}>
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
