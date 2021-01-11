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
  const [reservations, setReservations] = useState([]);
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
  const choseChair = (chair) => {
    const newReservations = [...reservations];
    const reservationSameDate = newReservations.find(
      ({ date }) => date === chair.date
    );
    const indexOfDate = newReservations.indexOf(reservationSameDate);
    if (reservationSameDate && reservationSameDate.chair === chair.chair) {
      newReservations.splice(indexOfDate, 1);
    } else if (reservationSameDate === undefined) {
      newReservations.push(chair);
    } else {
      newReservations[indexOfDate] = chair;
    }
    setReservations(newReservations);
  };
  const choseRow = (row) => {
    const newReservations = row.dates.map((item) => ({
      ...item,
      chair: row.name,
      id: row.id,
    }));
    setReservations(newReservations);
  };
  const chooseAnotherSeat = () => {
    setIsSubmited(false);
  };

  return (
    <Container className={styles.contWrapper}>
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
          <Receipt
            reservs={reservations}
            chooseAnotherSeat={chooseAnotherSeat}
          />
        ) : (
          <TableOfTables
            dateRange={dateRange}
            choseChair={choseChair}
            reservations={reservations}
            choseRow={choseRow}
          />
        )}
      </Container>
      {!isSubmited ? (
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
      ) : (
        ''
      )}
    </Container>
  );
};

export default ReservationsCreate;
