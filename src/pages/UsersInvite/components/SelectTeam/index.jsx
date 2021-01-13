import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
} from '@material-ui/core';
import { setTeams } from '../../../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../../../services/teams';
import useFetch from '../../../../hooks/useFetch';
import useStylesLocal, { getStyleMenuItem } from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectTeam = ({ team_id, value, onChange, error, helperText }) => {
  const dispatch = useDispatch();

  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  const makeRequest = useFetch();

  const classesLocal = useStylesLocal();
  const theme = useTheme();

  const getTeams = useCallback(async () => {
    // eslint-disable-line
    const { url, options } = getTeamsAllRequestData(token);
    try {
      const res = await makeRequest(url, options);

      // console.log(res);

      if (res.data) {
        dispatch(setTeams(res.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch, makeRequest, token]);

  useEffect(() => {
    if (!teams.length) {
      getTeams();
    }
  }, [teams, getTeams]);

  return (
    <FormControl
      variant="outlined"
      className={classesLocal.formControl}
      margin="normal"
      error={error}
    >
      <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        name={team_id}
        value={value}
        onChange={onChange}
        label="Team"
        MenuProps={MenuProps}
      >
        {teams.map(({ _id, name }) => (
          <MenuItem
            key={_id + name}
            value={name}
            style={getStyleMenuItem(name, value, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectTeam;
