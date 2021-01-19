import {
  FormHelperText,
  FormControl,
  NativeSelect,
  Box,
} from '@material-ui/core';
import useStylesLocal from './style';

const TeamsDropDown = ({ teams, onSelectChange }) => {
  // console.log("dropDownteams", teams)
  const classes = useStylesLocal();

  const handleSelectChange = (event) => {
    onSelectChange(event.target.value);
  };

  return (
    <Box ml={40}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={(e) => handleSelectChange(e)}
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

export default TeamsDropDown;
