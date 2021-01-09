import { useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TableOfTables from './components/TableOfTables';
import Receipt from './components/Receipt';
import useStyles from './style';

const ReservationsCreate = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const styles = useStyles();

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  // default value
  const defaultValue = new Date();
  defaultValue.setDate(defaultValue.getDate() + 1);

  // Mock Data
  const selectedChair = '2/4';
  const data = [
    {
      date: defaultValue,
      isFree: true,
      chair: selectedChair,
      id: Math.floor(Math.random() * 10000),
    },
    {
      date: defaultValue,
      isFree: false,
      chair: selectedChair,
      id: Math.floor(Math.random() * 10000),
    },
    {
      date: defaultValue,
      isFree: false,
      chair: selectedChair,
      id: Math.floor(Math.random() * 10000),
    },
    {
      date: defaultValue,
      isFree: true,
      chair: selectedChair,
      id: Math.floor(Math.random() * 10000),
    },
  ];

  return (
    <>
      <Container className={styles.topCont}>
        <Box className={styles.text}>Select date:</Box>
        <TextField
          className={styles.datePicker}
          id="datetime-from"
          label="From"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
          inputRef={refFrom}
        />
        <TextField
          className={styles.datePicker}
          id="datetime-to"
          label="To"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
          inputRef={refTo}
        />
      </Container>
      <Container className={styles.tableCont}>
        {isSubmited ? (
          <Receipt data={data} />
        ) : (
          <TableOfTables dateRefs={[defaultValue]} />
        )}
      </Container>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsSubmited(!isSubmited);
        }}
        className={styles.submitBtn}
      >
        {' '}
        Submit{' '}
      </Button>
    </>
  );
};

export default ReservationsCreate;
