import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
} from '@material-ui/core';
import { fetchTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import useStylesLocal, { getStyleMenuItem, MenuProps } from './style';

const TeamsDropdown = ({ team_id, value, onChange, error, helperText }) => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const theme = useTheme();

  const dispatch = useDispatch();

  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  useEffect(() => {
    dispatch(fetchTeams(token));
  }, [dispatch, token]);

  return (
    <FormControl
      variant="outlined"
      className={`${classesMain.inputLong} ${classesLocal.formControl}`}
      margin="normal"
      error={error}
    >
      <InputLabel id="demo-simple-select-outlined-label">Team*</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        name={team_id}
        value={value}
        onChange={onChange}
        label="Team"
        MenuProps={MenuProps}
      >
        {teams.map(({ _id, team_name }) => (
          <MenuItem
            key={_id + team_name}
            value={team_name}
            style={getStyleMenuItem(team_name, value, theme)}
          >
            {team_name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TeamsDropdown;
