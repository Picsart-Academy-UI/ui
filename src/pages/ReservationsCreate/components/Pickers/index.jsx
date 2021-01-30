import { Container, TextField, Box } from '@material-ui/core';
import useDate from '../../../../hooks/useDate';
import useStyles from './style';

const Pickers = ({ refFrom, refTo, handleEvent, defaultValue, error }) => {
  const { transformDataISO } = useDate();
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
        defaultValue={transformDataISO(defaultValue)}
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
        defaultValue={transformDataISO(defaultValue)}
        inputRef={refTo}
        onChange={handleEvent}
        helperText="Max: 30 days later Min: same day"
      />
    </Container>
  );
};

export default Pickers;
