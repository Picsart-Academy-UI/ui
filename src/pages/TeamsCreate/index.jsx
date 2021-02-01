import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import BackButton from '../../components/BackButton';
import makeFetch from '../../services';
import { getTeamCreateRequestData } from '../../services/teamsService';
import { addTeam } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';

const TeamsCreate = () => {
  const token = useSelector((state) => state.signin.token);
  const classesMain = useStylesMain();
  const history = useHistory();

  const nameRef = useRef();

  const onAddTeam = async (e) => {
    e.preventDefault();

    const body = {
      team_name: nameRef.current.value,
    };

    const res = await makeFetch(getTeamCreateRequestData({ token, body }));
    if (res.data) {
      nameRef.current.value = '';
      history.push('/teams');
      addTeam(res.data);
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
            label="Name"
            inputRef={nameRef}
          />
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

export default TeamsCreate;
