import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import { API_URL_PART } from '../../constants';
import useFetch from '../../hooks/useFetch';
import { getTeamCreateRequestData } from '../../services/teams';
import useStylesLocal from './style';

const TeamsCreate = () => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const classesLocal = useStylesLocal();
  const history = useHistory();

  const nameRef = useRef();

  const onAddTeam = async (e) => {
    e.preventDefault();

    const body = {
      team_name: nameRef.current.value,
    };

    const res = await makeRequest(
      getTeamCreateRequestData({ token, body, route: API_URL_PART.teams })
    );

    if (res.data) {
      nameRef.current.value = '';
      history.push('/teams');
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <form noValidate={false} onSubmit={onAddTeam}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            inputRef={nameRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classesLocal.sbmtButton}
          >
            Add
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default TeamsCreate;
