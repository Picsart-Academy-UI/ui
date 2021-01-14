import { useState, useRef } from 'react';
import { Container, Button } from '@material-ui/core';
import TableOfTables from './components/TableOfTables';
import Receipt from './components/Receipt';
import Pickers from './components/Pickers';
import useStyles from './style';

const ReservationsCreate = () => {
  const styles = useStyles();

  // default value
  const defaultValue = new Date();
  defaultValue.setDate(defaultValue.getDate() + 1);

  const [isSubmited, setIsSubmited] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [dateRange, setDateRange] = useState([defaultValue]);
  const [error, setError] = useState('none');

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const createRange = (start, stop) => {
    const range = [];
    const currentDate = start;
    while (currentDate <= stop) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };
  const calculateDiffInDays = (start, stop) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((start - stop) / oneDay);
  };

  const handleEvent = () => {
    const start = new Date(refFrom.current.value);
    const stop = new Date(refTo.current.value);
    const diffFromToday = calculateDiffInDays(start, new Date());
    const diffFromTo = calculateDiffInDays(start, stop);
    if (diffFromToday < 0 && (start > stop || diffFromTo > 6)) {
      setError('both');
    } else if (diffFromToday < 0) {
      setError('from');
    } else if (start > stop || diffFromTo < -6) {
      setError('to');
    } else {
      setError('none');
    }
    setReservations([]);
    setDateRange(createRange(start, stop));
  };
  const choseChair = (chair, shouldRemove) => {
    const newReservations = [...reservations];
    const reservationSameDate = newReservations.find(
      ({ date }) => date === chair.date
    );
    const indexOfDate = newReservations.indexOf(reservationSameDate);
    if (shouldRemove && indexOfDate > -1) {
      newReservations.splice(indexOfDate, 1);
    } else if (!shouldRemove) {
      if (reservationSameDate) {
        newReservations.splice(indexOfDate, 1);
      } else if (reservationSameDate === undefined) {
        newReservations.push(chair);
      } else {
        newReservations[indexOfDate] = chair;
      }
    }
    setReservations(newReservations);
  };
  const choseRow = (row) => {
    const newReservations = row.dates.reduce((accumilator, item) => {
      if (item.date.getDay() !== 0 && item.date.getDay() !== 6) {
        accumilator.push({
          ...item,
          chair: row.name,
          id: row.id,
        });
      }
      return accumilator;
    }, []);
    setReservations(newReservations);
  };
  const chooseAnotherSeat = () => {
    setIsSubmited(false);
  };

  return (
    <Container className={styles.contWrapper}>
      {!isSubmited ? (
        <Pickers
          refTo={refTo}
          refFrom={refFrom}
          handleEvent={handleEvent}
          defaultValue={defaultValue}
          error={error}
        />
      ) : null}

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
          disabled={reservations.length === 0 || error !== 'none'}
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
