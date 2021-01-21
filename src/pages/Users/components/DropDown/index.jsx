import {
  FormHelperText,
  FormControl,
  NativeSelect,
  Box,
} from '@material-ui/core';
import useStylesLocal from './style';

const DropDown = ({ teams }) => {
  // console.log("dropDownteams", teams)
  const classes = useStylesLocal();

  const handleSelectChange = () => {};

  return (
    <Box ml={40}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={handleSelectChange}
          name="Teams"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Teams' }}
        >
          <option>All</option>
          {teams && teams.length ? (
            teams.map((team) => (
              <option key={team._id}>{team.team_name}</option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </NativeSelect>
        <FormHelperText>Teams</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DropDown;
