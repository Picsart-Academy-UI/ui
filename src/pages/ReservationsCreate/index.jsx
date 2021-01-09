import { useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TableOfTables from './components/TableOfTables';
import Receipt from './components/Receipt';
import useStyles from './style';

const ReservationsCreate = () => {
  const styles = useStyles();

  // default value
  const defaultValue = new Date();
  defaultValue.setDate(defaultValue.getDate() + 1);

  const [isSubmited, setIsSubmited] = useState(false);
  const [dateRange, setDateRange] = useState([defaultValue]);

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const createRange = (start, stop) => {
    const range = [];
    const currentDate = new Date(start);
    const stopDate = new Date(stop).getDate();
    while (currentDate.getDate() <= stopDate) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  const handleEvent = () => {
    setDateRange(createRange(refFrom.current.value, refTo.current.value));
  };

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
          variant="outlined"
          id="from"
          label="From"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
          inputRef={refFrom}
          onChange={handleEvent}
        />
        <TextField
          className={styles.datePicker}
          variant="outlined"
          id="to"
          label="To"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
          inputRef={refTo}
          onChange={handleEvent}
        />
      </Container>
      <Container className={styles.tableCont}>
        {isSubmited ? (
          <Receipt data={data} />
        ) : (
          <TableOfTables
            dateRange={dateRange}
            dateRefs={[defaultValue, defaultValue]}
          />
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
