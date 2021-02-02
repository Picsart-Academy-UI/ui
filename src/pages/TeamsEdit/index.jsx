import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import makeFetch from '../../services';
import BackButton from '../../components/BackButton';
import { getTeamUpdateRequestData } from '../../services/teamsService';
import { updateTeam } from '../../store/slices/teamsSlice';
import useStylesMain from '../../hooks/useStylesMain';

const TeamsCreate = () => {
  const token = useSelector((state) => state.signin.token);
  const classesMain = useStylesMain();
  const history = useHistory();

  const { id } = useParams();

  const nameRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      id,
      team_name: nameRef.current.value,
    };

    const res = await makeFetch(getTeamUpdateRequestData({ token, body }));
    if (res.data) {
      nameRef.current.value = '';
      history.push('/teams');
      updateTeam(res.data);
    }
  };

  return (
    <>
      <BackButton />
      <Container component="div" maxWidth="xs">
        <form noValidate={false} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            defaultValue={history.location.state}
            inputRef={nameRef}
            className={classesMain.inputLong}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classesMain.inputLong} ${classesMain.picsartButton}`}
          >
            Change
          </Button>
        </form>
      </Container>
    </>
  );
};

export default TeamsCreate;
