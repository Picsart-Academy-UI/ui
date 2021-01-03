import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import useFetch from '../../hooks/useFetch';
import getTeamCreateRequestData from '../../services/teams/getTeamCreateRequestData';
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
      name: nameRef.current.value,
    };

    const { url, options } = getTeamCreateRequestData({ token, body });

    try {
      const res = await makeRequest(url, options);
      history.push('/teams');

      if (res.success) {
        nameRef.current.value = '';
        return true;
      }
      return false;
    } catch (err) {
      return new Error(err.message);
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
