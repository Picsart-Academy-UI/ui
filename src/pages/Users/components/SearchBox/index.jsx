import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const SearchBox = () => {
  const handleInputChange = () => {};

  return (
    <Box mt={3}>
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
