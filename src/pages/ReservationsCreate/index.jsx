import { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { fetchPendingApprovedTeamReservations } from '../../store/slices/reservationsSlice';
import { fetchChairs } from '../../store/slices/tablesSlice';
import { withoutHours, getNextPrevDays } from '../../utils/dateHelper';
import useQuery from '../../hooks/useQuery';
import { getReservationOnSameDate } from '../../utils/reservationHelper';
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

  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const [isSubmited, setIsSubmited] = useState(false);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([
    getNextPrevDays(new Date()).nextDay,
  ]);

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

  // handles the click event on BackButton
  const handleButton = () => setIsSubmited((prev) => !prev);

  useEffect(() => {
    const team_id = query.get('team_id') ? query.get('team_id') : userTeamId;
    dispatch(fetchPendingApprovedTeamReservations(token, team_id));
    dispatch(fetchChairs(token, team_id));
  }, []);

  useEffect(() => {
    setData(createTableData(chairsOfTheTeam, reservs, dateRange));
  }, [dateRange, reservs, chairsOfTheTeam]);

  return (
    <Container className={styles.contWrapper}>
      {isSubmited ? (
        <FinalCheck handleBack={handleButton} />
      ) : (
        <SelectionPart
          refFrom={refFrom}
          refTo={refTo}
          dateRange={dateRange}
          data={data}
          setDateRange={setDateRange}
          handleSubmit={handleButton}
        />
      )}
    </Container>
  );
};

export default memo(ReservationsCreate);
