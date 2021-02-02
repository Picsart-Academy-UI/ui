import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import SelectTeam from '../UsersInvite/components/SelectTeam';
import BackButton from '../../components/BackButton';
import makeFetch from '../../services';
import { getTableCreateRequestData } from '../../services/tablesService';
import { addTable } from '../../store/slices/tablesSlice';
import { setTeams } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import { getTeamsAllRequestData } from '../../services/teamsService';

const TablesCreate = () => {
  const classesMain = useStylesMain();
  const history = useHistory();
  const dispatch = useDispatch();
  const countRef = useRef();

  const [selectedTeam, setSelectedTeam] = useState('');

  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  useEffect(() => {
    const getTeams = async () => {
      const res = await makeFetch(getTeamsAllRequestData(token));
      if (res.data) {
        dispatch(setTeams(res));
      }
    };

    getTeams();
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamItem = teams.find(({ team_name }) => team_name === selectedTeam);

    const body = {
      table_number: countRef.current.value,
      team_id: teamItem._id,
    };

    const res = await makeFetch(getTableCreateRequestData({ token, body }));

    if (res.data) {
      countRef.current.value = '';
      history.push('/tables');
      addTable(res.data);
    }
  };

  const handleChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  return (
    <>
      <BackButton />
      <Container component="div">
        <form
          noValidate={false}
          onSubmit={handleSubmit}
          className={classesMain.centeredColumn}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Table Number"
            inputRef={countRef}
            type="number"
            className={classesMain.inputLong}
          />
          <SelectTeam
            id="team_id"
            team_id="team_id"
            value={selectedTeam}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classesMain.inputLong} ${classesMain.picsartButton}`}
          >
            Add
          </Button>
        </form>
      </Container>
    </>
  );
};

export default TablesCreate;
