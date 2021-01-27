import { Container, TextField, Box } from '@material-ui/core';
import useStyles from './style';

const Pickers = ({ refFrom, refTo, handleEvent, defaultValue, error }) => {
  const styles = useStyles();

  return (
    <Container className={styles.topCont}>
      <Box className={styles.text}>Select date:</Box>
      <TextField
        className={styles.datePicker}
        error={error === 'both' || error === 'from'}
        variant="outlined"
        label="From"
        type="date"
        defaultValue={defaultValue.toISOString().slice(0, 10)}
        inputRef={refFrom}
        onChange={handleEvent}
        helperText="Should be later than today"
      />
      <TextField
        className={styles.datePicker}
        error={error === 'both' || error === 'to'}
        variant="outlined"
        label="To"
        type="date"
        defaultValue={defaultValue.toISOString().slice(0, 10)}
        inputRef={refTo}
        onChange={handleEvent}
        helperText="Max: 30 days later Min: same day"
      />
    </Container>
  );
};

export default Pickers;
