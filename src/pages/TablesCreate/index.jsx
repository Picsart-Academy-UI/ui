import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  // MenuItem,
  // Select,
  Button,
  TextField,
  Container,
} from '@material-ui/core';
import BackButton from '../../components/BackButton';
import useFetch from '../../hooks/useFetch';
import { getTableCreateRequestData } from '../../services/tables';
import { addTable } from '../../store/slices/tablesSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import { getTeamsAllRequestData } from '../../services/teams';

const TablesCreate = () => {
  const { token } = useSelector((state) => ({
    token: state.signin.token,
    // teams: state.teams.teams
  }));

  const makeRequest = useFetch();
  const classesMain = useStylesMain();
  const history = useHistory();
  const dispatch = useDispatch();

  const countRef = useRef();
  const teamRef = useRef();

  useEffect(() => {
    const getTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const res = await makeRequest(requestData);
      if (res.data) {
        dispatch(setTeams(res));
      }
    };

    getTeams();
  }, [dispatch, makeRequest, token]);

  const onAddTeam = async (e) => {
    e.preventDefault();

    const body = {
      table_number: countRef.current.value,
      team_id: teamRef.current.value,
    };

    const res = await makeRequest(getTableCreateRequestData({ token, body }));
    console.log('body', history);
    if (res.data) {
      countRef.current.value = '';
      history.push('/tables');
      addTable(res.data);
    }
  };

  return (
    <>
      <BackButton />
      <Container component="main" maxWidth="xs">
        <form noValidate={false} onSubmit={onAddTeam}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Table Count"
            inputRef={countRef}
          />
          {/* <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectedTeam || 'Select team'}
            onChange={onChange}
            label="Team"
            MenuProps={teams}
          >
            {teams.map(({ _id, team_name }) => (
              <MenuItem
                key={_id + team_name}
                value={team_name}
                // style={getStyleMenuItem(team_name, selectedTeam, theme)}
              >
                {team_name}
              </MenuItem>
            ))}
          </Select> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classesMain.picsartButton}
          >
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default TablesCreate;
