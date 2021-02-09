import { memo } from 'react';
import { Container, TextField, Box } from '@material-ui/core';
import {
  transformDateToISOFormat,
  transformLocalToAMT,
} from '../../../../utils/dateHelper';
import useStyles from './style';

const Pickers = ({ refFrom, refTo, handleEvent, error }) => {
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
        defaultValue={transformDateToISOFormat(transformLocalToAMT(new Date()))}
        inputRef={refFrom}
        onChange={handleEvent}
        helperText="Should be or later than today"
      />
      <TextField
        className={styles.datePicker}
        error={error === 'both' || error === 'to'}
        variant="outlined"
        label="To"
        type="date"
        defaultValue={transformDateToISOFormat(transformLocalToAMT(new Date()))}
        inputRef={refTo}
        onChange={handleEvent}
        helperText="Max: 30 days later Min: same day"
      />
      <Box className={styles.smallText}>
        Remember that the date that is being shown to you is UTC+4
      </Box>
    </Container>
  );
};

export default memo(Pickers);
