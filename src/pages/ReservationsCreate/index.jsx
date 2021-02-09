import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import {
  fetchPendingApprovedTeamReservations,
  setSelected,
} from '../../store/slices/reservationsSlice';
import { fetchChairs } from '../../store/slices/tablesSlice';
import { withoutHours, transformLocalToAMT } from '../../utils/dateHelper';
import useQuery from '../../hooks/useQuery';
import { getReservationsOnSameDate } from '../../utils/reservationHelper';
import useStyles from './style';
import FinalCheck from './components/FinalCheck';
import SelectionPart from './components/SelectionPart';

const ReservationsCreate = () => {
  const styles = useStyles();

  const token = useSelector((state) => state.signin.token);
  const reservs = useSelector(
    (state) => state.reservations.reservsApprPendTeam
  );
  const curUser = useSelector((state) => state.signin.curUser);
  const chairsOfTheTeam = useSelector((state) => state.tables.chairs);
  const userTeamId = useSelector((state) => state.signin.curUser.team_id);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const query = useQuery();
  const team_id = query.get('team_id') ? query.get('team_id') : userTeamId;
  const user_id = query.get('id') ? query.get('id') : curUser._id;
  // ref data
  const refFrom = useRef();
  const refTo = useRef();

  const [isSubmited, setIsSubmited] = useState(false);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([transformLocalToAMT(new Date())]);

  // creates the data for the table
  const createTableData = useCallback(
    (chairs, reservsApprPend, range) => () =>
      chairs.map((chair) => {
        const reservationsSatisfied = reservsApprPend.filter(
          (res) => withoutHours(res.end_date) >= withoutHours(range[0])
        );
        const dates = range.map((date) => {
          const reservsOnSameDate = getReservationsOnSameDate(
            reservationsSatisfied,
            date.toISOString()
          );
          let status;
          if (reservsOnSameDate.length === 0) {
            status = 'free';
          } else {
            for (let i = 0; i < reservsOnSameDate.length; i++) {
              const reservOnSameDate = reservsOnSameDate[i];
              if (
                reservOnSameDate.user_id._id !== user_id &&
                reservOnSameDate.chair_id._id !== chair._id
              ) {
                status = 'free';
              } else if (
                reservOnSameDate.user_id._id === user_id &&
                reservOnSameDate.chair_id._id === chair._id
              ) {
                status = 'yours';
                break;
              } else if (
                reservOnSameDate.user_id._id === user_id &&
                reservOnSameDate.chair_id._id !== chair._id
              ) {
                status = 'unavailable';
                break;
              } else {
                status = 'reserved';
              }
            }
          }
          return { date: date.toISOString(), status };
        });
        return {
          name: `${chair.chair_number}/${chair.table_number}`,
          dates,
          id: chair._id,
          table_id: chair.table_id,
        };
      }),
    [user_id]
  );

  // handles the click event on BackButton
  const handleButton = () => setIsSubmited((prev) => !prev);

  useEffect(() => {
    // eslint-disable-next-line
    let fetchAmount = 0;
    const fetchCheck = () => {
      ++fetchAmount;
      if (fetchAmount >= 2) {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    dispatch(setSelected([]));
    dispatch(fetchPendingApprovedTeamReservations(token, team_id)).finally(() =>
      fetchCheck()
    );
    dispatch(fetchChairs(token, team_id)).finally(() => fetchCheck());
  }, [token, userTeamId, dispatch, team_id]);

  useEffect(() => {
    setData(createTableData(chairsOfTheTeam, reservs, dateRange));
  }, [dateRange, reservs, chairsOfTheTeam, createTableData]);

  return (
    <>
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
            isLoading={isLoading}
          />
        )}
      </Container>
    </>
  );
};

export default memo(ReservationsCreate);
