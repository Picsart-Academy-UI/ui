import { useState, useRef, useEffect, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from '@material-ui/core';
import { fetchPendingApprovedReservations } from '../../store/slices/reservationsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import useDate from './hooks/useDate';
import useReservation from './hooks/useReservation';
import TableOfTables from './components/TableOfTables';
import Receipt from './components/Receipt';
import Pickers from './components/Pickers';
import Loader from './components/Loader';
import useStylesLocal from './style';

const ReservationsCreate = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();

  // default value
  const defaultValue = useMemo(() => {
    const value = new Date();
    value.setDate(value.getDate() + 1);
    value.setHours(0, 0, 0, 0);
    return value;
  }, []);

  const token = useSelector((state) => state.signin.token);
  const reservs = useSelector((state) => state.reservations.reservsApprPend);
  const dispatch = useDispatch();

  const [isSubmited, setIsSubmited] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [data, setData] = useState(null);
  const [dateRange, setDateRange] = useState([defaultValue]);
  const [error, setError] = useState('none');
  const [isLoading, setIsLoading] = useState(true);

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const {
    createRange,
    withoutHours,
    calculateDiffInDays,
    getNextPrevDays,
  } = useDate();
  const {
    getReservationOnSameDate,
    getReservationsAvailableMerging,
  } = useReservation();
  const chairsOfTheTeam = useMemo(
    () => [
      {
        table_name: 'A',
        team_id: 'team0',
        chair_name: 'B',
        table_id: 'table0',
        _id: 'chair0',
      },
    ],
    []
  );
  // creates the data for the table
  const createTableData = (chairs, reservsApprPend, range) => {
    setIsLoading(true);
    return chairs.map((chair) => {
      const reservationsSatisfied = reservsApprPend.filter(
        (res) =>
          res.chair_id === chair._id &&
          withoutHours(res.end_date) >= withoutHours(range[0])
      );
      const dates = range.map((date) => {
        const reservOnSameDate = getReservationOnSameDate(
          reservationsSatisfied,
          date
        );
        const isFree = reservOnSameDate === undefined;
        return { date, isFree };
      });
      setIsLoading(false);
      return {
        name: `${chair.chair_name}/${chair.table_name}`,
        dates,
        id: chair._id,
      };
    });
  };
  // handles the event of changing the date in date picker
  const handleEvent = () => {
    // error handling
    const start = new Date(refFrom.current.value);
    const stop = new Date(refTo.current.value);
    const diffFromToday = calculateDiffInDays(start, new Date());
    const diffFromTo = calculateDiffInDays(start, stop);
    if (diffFromToday < 0 && (start > stop || diffFromTo < -29)) {
      setError('both');
      return;
      // eslint-disable-next-line
    } else if (diffFromToday <= 0) {
      setError('from');
      return;
      // eslint-disable-next-line
    } else if (start > stop || diffFromTo < -29) {
      setError('to');
      return;
      // eslint-disable-next-line
    } else {
      setError('none');
    }

    const range = createRange(start, stop);
    // should send a request to get the chair
    setDateRange(range);
  };
  // selects the chair
  const choseChair = (chair) => {
    // creates new arr to avoid mutation
    const newReservations = [...reservations];
    // finds reservation that occupy the column(i.e day) that we clicked on
    const reservationSameDate = getReservationOnSameDate(
      newReservations,
      chair.date
    );
    // finds already clicked reservations that are available for merging
    const reservationAvailableForMerging = getReservationsAvailableMerging(
      newReservations,
      chair.chairName,
      chair.date
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
      // 1
      // case when the chosen chair has an option of merging with already selected chair
      if (reservationAvailableForMerging) {
        // 1.1
        // case when the previously selected chair was just one day i.e it should be delted
        if (reservationSameDate.start_date === reservationSameDate.end_date) {
          // 1.1.1
          newReservations.splice(indexOfDate, 1);
        } else {
          // 1.1.2
          // case when the previously selected chair was stretching for a minimum of 2 days
          newReservations[indexOfDate] = {
            ...reservationSameDate,
            start_date:
              chair.date.getDate() === reservationSameDate.start_date.getDate()
                ? nextDay
                : reservationSameDate.start_date,
            end_date:
              chair.date.getDate() === reservationSameDate.end_date.getDate()
                ? prevDay
                : reservationSameDate.end_date,
          };
        }
        // merges  with already existant reservation
        newReservations[indexOfAvailable] = {
          ...reservationAvailableForMerging,
          start_date:
            reservationAvailableForMerging.start_date < chair.date
              ? reservationAvailableForMerging.start_date
              : chair.date,
          end_date:
            reservationAvailableForMerging.end_date > chair.date
              ? reservationAvailableForMerging.end_date
              : chair.date,
        };
      } else if (reservationAvailableForMerging === undefined) {
        // eslint-disable-next-line
        if (reservationSameDate.start_date === reservationSameDate.end_date) {
          newReservations.splice(indexOfDate, 1);
        } else if (
          chair.date > reservationSameDate.start_date &&
          chair.date < reservationSameDate.end_date
        ) {
          newReservations.push({ ...reservationSameDate, start_date: nextDay });
          newReservations[indexOfDate].end_date = prevDay;
        } else if (chair.date === reservationSameDate.start_date) {
          newReservations[indexOfDate].start_date = nextDay;
        } else {
          newReservations[indexOfDate].endDate = prevDay;
        }
        newReservations.push({
          chairName: chair.chairName,
          id: chair.id,
          start_date: chair.date,
          end_date: chair.date,
          isFree: chair.isFree,
        });
      }
    } else if (reservationSameDate) {
      // case when chair clicked is already chosen
      if (
        chair.date > reservationSameDate.start_date &&
        chair.date < reservationSameDate.end_date
      ) {
        // case when the one reservation should be split in half
        newReservations.push({ ...reservationSameDate, start_date: nextDay });
        newReservations[indexOfDate].end_date = prevDay;
      } else if (
        reservationSameDate.start_date.getDate() ===
        reservationSameDate.end_date.getDate()
      ) {
        // case when the prev selected chair is just for one day
        newReservations.splice(indexOfDate, 1);
      } else if (
        chair.date.getDate() === reservationSameDate.start_date.getDate()
      ) {
        // case when the one reservation should change its start date
        newReservations[indexOfDate].start_date = nextDay;
      } else if (
        chair.date.getDate() === reservationSameDate.end_date.getDate()
      ) {
        // case when the one reservation should change its end date
        newReservations[indexOfDate].end_date = prevDay;
      }
    } else {
      // case when no chair was selected on that day
      // eslint-disable-next-line
      if (reservationAvailableForMerging) {
        newReservations[indexOfAvailable] = {
          ...reservationAvailableForMerging,
          start_date:
            reservationAvailableForMerging.start_date < chair.date
              ? reservationAvailableForMerging.start_date
              : chair.date,
          end_date:
            reservationAvailableForMerging.end_date > chair.date
              ? reservationAvailableForMerging.end_date
              : chair.date,
        };
      } else {
        newReservations.push({
          chairName: chair.chairName,
          id: chair.id,
          start_date: chair.date,
          end_date: chair.date,
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
        const reservationAvailableForMerging = getReservationsAvailableMerging(
          accumilator,
          row.name,
          item.date
        );
        if (reservationAvailableForMerging) {
          const indexOfMerge = accumilator.indexOf(
            reservationAvailableForMerging
          );
          accumilator[indexOfMerge] = {
            ...reservationAvailableForMerging,
            start_date:
              reservationAvailableForMerging.start_date < item.date
                ? reservationAvailableForMerging.start_date
                : item.date,
            end_date:
              reservationAvailableForMerging.end_date > item.date
                ? reservationAvailableForMerging.end_date
                : item.date,
          };
        } else {
          accumilator.push({
            isFree: item.isFree,
            end_date: item.date,
            start_date: item.date,
            chairName: row.name,
            id: row.id,
          });
        }
      }
      return accumilator;
    }, []);
    setReservations(newReservations);
  };

  useEffect(() => {
    dispatch(fetchPendingApprovedReservations(token));
    setData(createTableData(chairsOfTheTeam, reservs, dateRange));
  }, [chairsOfTheTeam, dateRange]);

  return (
    <Container className={classesLocal.contWrapper}>
      {!isSubmited ? (
        <Pickers
          refTo={refTo}
          refFrom={refFrom}
          handleEvent={handleEvent}
          defaultValue={defaultValue}
          error={error}
        />
      ) : null}

      <Container className={classesLocal.tableCont}>
        {isSubmited ? (
          <Receipt reservs={reservations} />
        ) : (
          <>
            {!isLoading ? (
              <TableOfTables
                dateRange={dateRange}
                choseChair={choseChair}
                reservations={reservations}
                choseRow={choseRow}
                data={data}
              />
            ) : (
              <Loader />
            )}
          </>
        )}
      </Container>
      {!isSubmited ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsSubmited(!isSubmited);
          }}
          className={`${classesLocal.submitBtn} ${classesMain.commonButton}`}
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

export default memo(ReservationsCreate);
