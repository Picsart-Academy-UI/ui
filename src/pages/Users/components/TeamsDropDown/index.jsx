import { FormHelperText, FormControl, NativeSelect } from '@material-ui/core';
import useStylesLocal from './style';

const TeamsDropDown = ({ teams, onSelectChange }) => {
  console.log('dropDownteams', teams);
  const classes = useStylesLocal();

  const handleSelectChange = (event) => {
    const { value } = event.target;
    if (value === 'All') {
      onSelectChange('');
      return;
    }
    const { _id } = teams.find((team) => team.team_name === value);
    onSelectChange(_id);
  };

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        onChange={handleSelectChange}
        name="Teams"
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Teams' }}
      >
        <option>All</option>
        {teams && teams.length ? (
          teams.map((team) => <option key={team._id}>{team.team_name}</option>)
        ) : (
          <option>Loading...</option>
        )}
      </NativeSelect>
      <FormHelperText>Teams</FormHelperText>
    </FormControl>
  );
};

export default TeamsDropDown;
