import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

const SelectTeam = ({
  selectTeamId,
  shouldBeReseted,
  setTeamShouldBeReseted,
}) => {
  const [teamsAll, setTeamsAll] = useState([]);
  const [team, setTeam] = useState('');

  const token = useSelector((state) => state.signin.token);

  const makeRequest = useFetch();

  const classesLocal = useStylesLocal();
  const theme = useTheme();

  const handleChange = (event) => {
    const teamItem = teamsAll.find(({ name }) => name === event.target.value);
    const { _id } = teamItem;
    setTeam(event.target.value);
    selectTeamId(_id);
  };

  const getTeamsAllAuto = useCallback(async () => {
    const { url, options } = getTeamsAllRequestData(token);
    try {
      const res = await makeRequest(url, options);

      // console.log(res);

      if (res.teams) {
        setTeamsAll(res.teams);
        return true;
      }
      return false;
    } catch (err) {
      return new Error(err.message);
    }
  }, [makeRequest, token]);

  useEffect(() => {
    if (!teamsAll.length) {
      getTeamsAllAuto();
    }
  }, [teamsAll, getTeamsAllAuto]);

  useEffect(() => {
    if (shouldBeReseted) {
      setTeam('');
      setTeamShouldBeReseted(false);
    }
  }, [shouldBeReseted, setTeamShouldBeReseted]);

  return (
    <FormControl
      variant="outlined"
      className={classesLocal.formControl}
      margin="normal"
      required
    >
      <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={team}
        onChange={handleChange}
        label="Team"
        MenuProps={MenuProps}
      >
        {teamsAll.map(({ _id, name }) => (
          <MenuItem
            key={_id + name}
            value={name}
            style={getStyleMenuItem(name, team, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectTeam;
