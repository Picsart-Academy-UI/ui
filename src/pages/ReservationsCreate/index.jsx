import { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { fetchPendingApprovedTeamReservations } from '../../store/slices/reservationsSlice';
import { fetchTables } from '../../store/slices/tableSlice';
import useDate from '../../hooks/useDate';
import useQuery from '../../hooks/useQuery';
import useReservation from './hooks/useReservation';
import useStyles from './style';
import FinalCheck from './components/FinalCheck';
import SelectionPart from './components/SelectionPart';

const ReservationsCreate = () => {
  const styles = useStyles();

  const token = useSelector((state) => state.signin.token);
  const reservs = useSelector(
    (state) => state.reservations.reservsApprPendTeam
  );
  const chairsOfTheTeam = useSelector((state) => state.tables.chairs);
  const userTeamId = useSelector((state) => state.signin.curUser.team_id);
  const dispatch = useDispatch();
  const query = useQuery();

  const { withoutHours, getNextPrevDays } = useDate();

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const [isSubmited, setIsSubmited] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([
    getNextPrevDays(new Date()).nextDay,
  ]);

  const {
    getReservationOnSameDate,
    getReservationsAvailableMerging,
  } = useReservation();

  // creates the data for the table
  const createTableData = (chairs, reservsApprPend, range) =>
    chairs.map((chair) => {
      const reservationsSatisfied = reservsApprPend.filter(
        (res) =>
          res?.chair_id?._id === chair._id &&
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
      return {
        name: `${chair.chair_number}/${chair.table_number}`,
        dates,
        id: chair._id,
        table_id: chair.table_id,
      };
    });

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
          table_id: chair.table_id,
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
          table_id: chair.table_id,
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
            end_date: withoutHours(item.date),
            start_date: withoutHours(item.date),
            chairName: row.name,
            table_id: row.table_id,
            id: row.id,
          });
        }
      }
      return accumilator;
    }, []);
    console.log(newReservations);
    setReservations(newReservations);
  };
  // handles the click event on BackButton
  const handleButton = () => setIsSubmited((prev) => !prev);

  useEffect(() => {
    const team_id = query.get('team_id') ? query.get('team_id') : userTeamId;
    dispatch(fetchPendingApprovedTeamReservations(token, team_id));
    dispatch(fetchTables(token, team_id));
  }, []);

  useEffect(() => {
    setData(createTableData(chairsOfTheTeam, reservs, dateRange));
  }, [dateRange, reservs, chairsOfTheTeam]);

  return (
    <Container className={styles.contWrapper}>
      {isSubmited ? (
        <FinalCheck reservations={reservations} handleBack={handleButton} />
      ) : (
        <SelectionPart
          refFrom={refFrom}
          refTo={refTo}
          choseChair={choseChair}
          choseRow={choseRow}
          dateRange={dateRange}
          reservations={reservations}
          data={data}
          setDateRange={setDateRange}
          handleSubmit={handleButton}
        />
      )}
    </Container>
  );
};

export default memo(ReservationsCreate);
