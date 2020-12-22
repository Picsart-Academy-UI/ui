import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DropDown = () => {
  const classes = useStyles();

  const handleSelectChange = () => {};

  return (
    <div>
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
    </div>
  );
};

export default DropDown;
