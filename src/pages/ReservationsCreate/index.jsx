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
    if (diffFromToday < 0 && (start > stop || diffFromTo < -6)) {
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
  const choseChair = (chair) => {
    const newReservations = [...reservations];
    const reservationSameDate = newReservations.find(
      ({ startDate, endDate }) =>
        chair.date >= startDate && chair.date <= endDate
    );

    const reservationAvailableForMerging = newReservations.find(
      ({ startDate, endDate, chairName }) => {
        const nextDay = new Date(chair.date);
        const prevDay = new Date(chair.date);
        nextDay.setDate(nextDay.getDate() + 1);
        prevDay.setDate(prevDay.getDate() - 1);
        return (
          (nextDay.getDate() === startDate.getDate() &&
            chairName === chair.chairName) ||
          (prevDay.getDate() === endDate.getDate() &&
            chairName === chair.chairName)
        );
      }
    );
    const indexOfDate = newReservations.indexOf(reservationSameDate);
    const indexOfAvailable = newReservations.indexOf(
      reservationAvailableForMerging
    );
    const nextDay = new Date(chair.date);
    const prevDay = new Date(chair.date);
    nextDay.setDate(nextDay.getDate() + 1);
    prevDay.setDate(prevDay.getDate() - 1);
    // case when the chair was on a day that was already reserved by another chair
    // eslint-disable-next-line
    if (
      reservationSameDate &&
      reservationSameDate.chairName !== chair.chairName
    ) {
      if (reservationAvailableForMerging) {
        console.log('a');
        if (reservationSameDate.startDate === reservationSameDate.endDate) {
          newReservations.splice(indexOfDate, 1);
          console.log('b');
        } else {
          newReservations[indexOfDate] = {
            ...reservationSameDate,
            startDate:
              chair.date.getDate() === reservationSameDate.startDate.getDate()
                ? nextDay
                : reservationSameDate.startDate,
            endDate:
              chair.date.getDate() === reservationSameDate.endDate.getDate()
                ? prevDay
                : reservationSameDate.endDate,
          };
          console.log('c');
        }

        newReservations[indexOfAvailable] = {
          ...reservationAvailableForMerging,
          startDate:
            reservationAvailableForMerging.startDate < chair.date
              ? reservationAvailableForMerging.startDate
              : chair.date,
          endDate:
            reservationAvailableForMerging.endDate > chair.date
              ? reservationAvailableForMerging.endDate
              : chair.date,
        };
      } else if (reservationAvailableForMerging === undefined) {
        // eslint-disable-next-line
        if (
          chair.date > reservationSameDate.startDate &&
          chair.date < reservationSameDate.endDate
        ) {
          console.log('e');
          newReservations.push({ ...reservationSameDate, startDate: nextDay });
          newReservations[indexOfDate].endDate = prevDay;
        } else if (chair.date === reservationSameDate.startDate) {
          newReservations[indexOfDate].startDate = nextDay;
        } else {
          newReservations[indexOfDate].endDate = prevDay;
        }
        newReservations.push({
          chairName: chair.chairName,
          id: chair.id,
          startDate: chair.date,
          endDate: chair.date,
          isFree: chair.isFree,
        });
      }
    } else if (reservationSameDate) {
      // case when chair clicked is already chosen
      if (
        chair.date > reservationSameDate.startDate &&
        chair.date < reservationSameDate.endDate
      ) {
        newReservations.push({ ...reservationSameDate, startDate: nextDay });
        newReservations[indexOfDate].endDate = prevDay;
      } else if (
        chair.date.getDate() === reservationSameDate.startDate.getDate() &&
        chair.date.getDate() === reservationSameDate.endDate.getDate()
      ) {
        newReservations.splice(indexOfDate, 1);
      } else if (
        chair.date.getDate() === reservationSameDate.startDate.getDate()
      ) {
        newReservations[indexOfDate].startDate = nextDay;
      } else if (
        chair.date.getDate() === reservationSameDate.endDate.getDate()
      ) {
        newReservations[indexOfDate].endDate = prevDay;
      }
    } else {
      // case when no chair was selected on that day
      // eslint-disable-next-line
      if (reservationAvailableForMerging) {
        newReservations[indexOfAvailable] = {
          ...reservationAvailableForMerging,
          startDate:
            reservationAvailableForMerging.startDate < chair.date
              ? reservationAvailableForMerging.startDate
              : chair.date,
          endDate:
            reservationAvailableForMerging.endDate > chair.date
              ? reservationAvailableForMerging.endDate
              : chair.date,
        };
      } else {
        newReservations.push({
          chairName: chair.chairName,
          id: chair.id,
          startDate: chair.date,
          endDate: chair.date,
          isFree: chair.isFree,
        });
      }
    }
    console.log(newReservations);
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
    console.log(newReservations);
    setReservations(newReservations);
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
          <Receipt reservs={reservations} />
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
