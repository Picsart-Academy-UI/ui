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
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState([defaultValue]);
  const [error, setError] = useState('none');
  const [isLoading, setIsLoading] = useState(true);

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const reservationsAlreadyInForce = [
    {
      table_id: 'table0',
      chair_id: 'chair0',
      team_id: 'team0',
      user_id: 'user0',
      status: 'approved',
      start_date: '2021-01-27',
      end_date: '2021-01-27',
    },
    {
      table_id: 'table1',
      chair_id: 'chair1',
      team_id: 'team1',
      user_id: 'user1',
      status: 'approved',
      start_date: '2021-01-27',
      end_date: '2021-01-27',
    },
    {
      table_id: 'table2',
      chair_id: 'chair2',
      team_id: 'team2',
      user_id: 'user2',
      status: 'approved',
      start_date: '2021-01-27',
      end_date: '2021-01-27',
    },
    {
      table_id: 'table3',
      chair_id: 'chair3',
      team_id: 'team3',
      user_id: 'user3',
      status: 'approved',
      start_date: '2021-01-27',
      end_date: '2021-01-27',
    },
    {
      table_id: 'table4',
      chair_id: 'chair4',
      team_id: 'team4',
      user_id: 'user4',
      status: 'approved',
      start_date: '2021-01-27',
      end_date: '2021-01-27',
    },
  ];
  const chairsOfTheTeam = [
    {
      table_name: 'A',
      team_id: 'team0',
      chair_name: 'B',
      table_id: 'table0',
      _id: 'chair0',
    },
    {
      table_name: 'A',
      team_id: 'team1',
      chair_name: 'B',
      table_id: 'table1',
      _id: 'chair1',
    },
    {
      table_name: 'A',
      team_id: 'team2',
      chair_name: 'B',
      table_id: 'table2',
      _id: 'chair2',
    },
    {
      table_name: 'A',
      team_id: 'team3',
      chair_name: 'B',
      table_id: 'table3',
      _id: 'chair3',
    },
    {
      table_name: 'A',
      team_id: 'team4',
      chair_name: 'B',
      table_id: 'table4',
      _id: 'chair4',
    },
  ];

  // creates an Array of dates
  const createRange = (start, stop) => {
    const range = [];
    const currentDate = new Date(start);
    while (currentDate <= stop) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  // gets next and previous dates of the given date
  const getNextPrevDays = (date) => {
    const nextDay = new Date(date);
    const prevDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    prevDay.setDate(prevDay.getDate() - 1);
    return { nextDay, prevDay };
  };

  // calculates the differance between two days
  const calculateDiffInDays = (start, stop) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((start - stop) / oneDay);
  };
  // handles the event of changing the date in date picker
  const handleEvent = () => {
    setIsLoading(true);

    const start = new Date(refFrom.current.value);
    const stop = new Date(refTo.current.value);
    const diffFromToday = calculateDiffInDays(start, new Date());
    const diffFromTo = calculateDiffInDays(start, stop);
    if (diffFromToday < 0 && (start > stop || diffFromTo < -29)) {
      setError('both');
    } else if (diffFromToday < 0) {
      setError('from');
    } else if (start > stop || diffFromTo < -29) {
      setError('to');
    } else {
      setError('none');
    }
    const range = createRange(start, stop);

    // should send request to get the requests that have status pending or active and are in range of the two dates
    // should send a request to get the chair
    console.log(data);
    const dataForTable = chairsOfTheTeam.map((chair) => {
      // eslint-disable-next-line
      const reservationsSatisfied = reservationsAlreadyInForce.filter(
        (res) =>
          res.chair_id === chair._id &&
          new Date(res.start_date) >= start &&
          new Date(res.end_date) <= stop
      );
      const dates = range.map((date) => {
        const reservOnSameDate = reservationsSatisfied.find(
          (res) =>
            date >= new Date(res.start_date) && date <= new Date(res.end_date)
        );
        const isFree = reservOnSameDate === undefined;
        return { date, isFree };
      });
      // eslint-disable-next-line
      const obj = {
        name: `${chair.chair_name}/${chair.table_name}`,
        dates: dates,
        id: chair._id,
      };
      return obj;
    });
    console.log(dataForTable);
    setData(dataForTable);
    setReservations([]);
    setDateRange(range);
  };

  // selects the chair
  const choseChair = (chair) => {
    const newReservations = [...reservations];
    const reservationSameDate = newReservations.find(
      ({ startDate, endDate }) =>
        chair.date >= startDate && chair.date <= endDate
    );

    const reservationAvailableForMerging = newReservations.find(
      ({ startDate, endDate, chairName }) => {
        const { nextDay, prevDay } = getNextPrevDays(chair.date);
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
    const { nextDay, prevDay } = getNextPrevDays(chair.date);
    // case when the chair was on a day that was already reserved by another chair
    // eslint-disable-next-line
    if (
      reservationSameDate &&
      reservationSameDate.chairName !== chair.chairName
    ) {
      // case when the chosen chair has an option of merging with already selected chair
      if (reservationAvailableForMerging) {
        // case when the previously selected chair was just one day i.e it should be delted
        if (reservationSameDate.startDate === reservationSameDate.endDate) {
          newReservations.splice(indexOfDate, 1);
        } else {
          // case when the previously selected chair was stretching for a minimum of 2 days
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
        // case when the one reservation should be split in half
        newReservations.push({ ...reservationSameDate, startDate: nextDay });
        newReservations[indexOfDate].endDate = prevDay;
      } else if (
        chair.date.getDate() === reservationSameDate.startDate.getDate() &&
        chair.date.getDate() === reservationSameDate.endDate.getDate()
      ) {
        // case when the prev selected chair is just for one day
        newReservations.splice(indexOfDate, 1);
      } else if (
        chair.date.getDate() === reservationSameDate.startDate.getDate()
      ) {
        // case when the one reservation should change its start date
        newReservations[indexOfDate].startDate = nextDay;
      } else if (
        chair.date.getDate() === reservationSameDate.endDate.getDate()
      ) {
        // case when the one reservation should change its end date
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
    setReservations(newReservations);
  };

  // selects the row
  const choseRow = (row) => {
    const newReservations = row.dates.reduce((accumilator, item) => {
      if (item.date.getDay() !== 0 && item.date.getDay() !== 6 && item.isFree) {
        const reservationAvailableForMerging = accumilator.find(
          ({ startDate, endDate, chairName }) => {
            const { nextDay, prevDay } = getNextPrevDays(item.date);
            return (
              (nextDay.getDate() === startDate.getDate() &&
                chairName === row.name) ||
              (prevDay.getDate() === endDate.getDate() &&
                chairName === row.name)
            );
          }
        );

        if (reservationAvailableForMerging) {
          const indexOfMerge = accumilator.indexOf(
            reservationAvailableForMerging
          );
          accumilator[indexOfMerge] = {
            ...reservationAvailableForMerging,
            startDate:
              reservationAvailableForMerging.startDate < item.date
                ? reservationAvailableForMerging.startDate
                : item.date,
            endDate:
              reservationAvailableForMerging.endDate > item.date
                ? reservationAvailableForMerging.endDate
                : item.date,
          };
        } else {
          accumilator.push({
            isFree: item.isFree,
            endDate: item.date,
            startDate: item.date,
            chairName: row.name,
            id: row.id,
          });
        }
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
            isLoading={isLoading}
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
