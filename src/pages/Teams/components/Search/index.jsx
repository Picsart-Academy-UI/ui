import { TextField, Grid } from '@material-ui/core';

const Search = ({ handleChange }) => (
  <Grid component="div" container>
    <form noValidate autoComplete="off">
      <TextField
        label="Search team"
        variant="outlined"
        onChange={handleChange}
      />
    </form>
  </Grid>
);

export default Search;
