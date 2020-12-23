import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Box from '@material-ui/core/Box';

import useStylesLocal from './style';

const DropDown = () => {
  // in future collect value from props
  const classes = useStylesLocal();

  const handleSelectChange = () => {};

  return (
    <Box ml={8} mb={1}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={handleSelectChange}
          name="Teams"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Teams' }}
        >
          <option>All</option>
          <option>Team 1</option>
          <option>Team 2</option>
          <option>Team 3</option>
          <option>Team 4</option>
          <option>Team 5</option>
        </NativeSelect>
        <FormHelperText>Teams</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DropDown;
