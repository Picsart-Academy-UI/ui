import {
  Button,
  TextField,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import TeamsDropdown from '../../../../components/TeamsDropdown';
import useStylesMain, { theme } from '../../../../hooks/useStylesMain';
import useForm from './hooks/useForm';
import validate from './hooks/validateInfo';
import useStylesLocal from './style';

const TableCreate = ({ submitForm, isRequestNow }) => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const { values, errors, handleChange, handleSubmit } = useForm(
    submitForm,
    validate
  );

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="div">
        <form
          noValidate={false}
          onSubmit={handleSubmit}
          className={classesMain.centeredColumn}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Table Number"
            name="table_number"
            type="number"
            className={classesMain.inputLong}
            value={values.table_number}
            onChange={handleChange}
            error={Boolean(errors.table_number)}
            helperText={errors.table_number}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Chairs Count"
            name="chairs_count"
            type="number"
            className={classesMain.inputLong}
            value={values.chairs_count}
            onChange={handleChange}
            error={Boolean(errors.chairs_count)}
            helperText={errors.chairs_count}
          />
          <TeamsDropdown
            id="team_id"
            team_id="team_id"
            value={values.team_id}
            onChange={handleChange}
            error={Boolean(errors.team_id)}
            helperText={errors.team_id}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${classesMain.inputLong} ${classesMain.picsartButton}`}
            disabled={isRequestNow}
          >
            {isRequestNow ? (
              <CircularProgress size={24} className={classesLocal.loader} />
            ) : (
              'Add Table'
            )}
          </Button>
        </form>
      </Container>
    </MuiThemeProvider>
  );
};

export default TableCreate;
