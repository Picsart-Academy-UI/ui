import { TextField, Grid } from '@material-ui/core';

const Search = () => {
  const handleChange = () => {};

  return (
    <Grid component="div" container>
      <form noValidate autoComplete="off">
        <TextField
          label="Search team"
          variant="outlined"
          onChange={handleChange}
          value=""
        />
      </form>
    </Grid>
  );
};

export default Search;
