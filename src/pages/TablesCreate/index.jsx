import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import BackButton from '../../components/BackButton';
import useFetch from '../../hooks/useFetch';
import { getTableCreateRequestData } from '../../services/tables';
import { addTable } from '../../store/slices/tablesSlice';
import useStylesMain from '../../hooks/useStylesMain';

const TablesCreate = () => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const classesMain = useStylesMain();
  const history = useHistory();
  const { id } = useParams();

  const nameRef = useRef();

  const onAddTeam = async (e) => {
    e.preventDefault();

    const body = {
      table_name: nameRef.current.value,
      team_id: id,
    };

    const res = await makeRequest(getTableCreateRequestData({ token, body }));
    console.log('body', history);
    if (res.data) {
      nameRef.current.value = '';
      history.goBack();
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
            label="Table Name"
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

export default TablesCreate;
