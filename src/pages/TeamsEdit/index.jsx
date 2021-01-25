import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import useFetch from '../../hooks/useFetch';
import BackButton from '../../components/BackButton';
import { getTeamUpdateRequestData } from '../../services/teams';
import { updateTeam } from '../../store/slices/teamsSlice';
import useStylesLocal from './style';

const TeamsCreate = () => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const classesLocal = useStylesLocal();
  const history = useHistory();

  const { id } = useParams();

  const nameRef = useRef();

  const onChangeTeam = async (e) => {
    e.preventDefault();

    const body = {
      id,
      team_name: nameRef.current.value,
    };

    const res = await makeRequest(getTeamUpdateRequestData({ token, body }));
    console.log(res);
    if (res.data) {
      nameRef.current.value = '';
      history.push('/teams');
      updateTeam(res.data);
    }
  };

  return (
    <div>
      <BackButton />
      <Container component="main" maxWidth="xs">
        <form noValidate={false} onSubmit={onChangeTeam}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            defaultValue={history.location.state}
            inputRef={nameRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classesLocal.sbmtButton}
          >
            Update
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default TeamsCreate;
