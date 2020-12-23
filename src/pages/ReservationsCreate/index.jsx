import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import useStyles from './styles';

const ReservationsCreate = () => {
  const styles = useStyles();

  // default value
  const defaultFromValue = new Date();
  defaultFromValue.setDate(defaultFromValue.getDate() + 1);

  return (
    <>
      <Container
        className={styles.topCont}
        display="flex"
        justifyContent="space-around"
      >
        <Box className={styles.text}>Select date:</Box>
        <TextField
          className={styles.datePicker}
          id="datetime-from"
          label="From"
          type="datetime-local"
          defaultValue={defaultFromValue.toISOString().slice(0, 16)}
        />
        <TextField
          className={styles.datePicker}
          id="datetime-to"
          label="To"
          type="datetime-local"
          defaultValue={defaultFromValue.toISOString().slice(0, 16)}
        />
      </Container>
    </>
  );
};

export default ReservationsCreate;
