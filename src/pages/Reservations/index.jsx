import { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Button } from '@material-ui/core';
import TablePageWrapper from '../../components/TablePageWrapper';
import BackButton from '../../components/BackButton';
import {
  fetchReservations,
  deleteReservationRequest,
} from '../../store/slices/reservationsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import useQuery from '../../hooks/useQuery';
import ResTable from './components/ResTable';
import useStylesLocal from './style';

const Reservations = () => {
  const classesMain = useStylesMain();
  const styles = useStylesLocal();

  const history = useHistory();
  const location = useLocation();
  const query = useQuery();
  const user_id = query.get('user_id');
  const token = useSelector((state) => state.signin.token);
  const reservs = useSelector((state) => state.reservations.reservations);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const deleteRes = useCallback(
    (id, status) => {
      if (status === 'approved') {
        dispatch(deleteReservationRequest(token, id));
      } else {
        history.push('/requests');
      }
    },
    [dispatch, history, token]
  );

  const onAddReservationClick = useCallback(() => {
    const url = user_id
      ? `/reservations/create?user_id=${user_id}`
      : '/reservations/create';
    history.push(url);
  }, [user_id, history]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchReservations(token, user_id)).finally(() =>
      setIsLoading(false)
    );
    return null;
  }, [user_id, token, dispatch]);

  return (
    <TablePageWrapper>
      {user_id ? <BackButton /> : null}
      <Container>
        <Box
          display="flex"
          justifyContent="space-around"
          className={styles.boxHeader}
        >
          <Box> Active reservations </Box>
          {!user_id && !location.state ? (
            <Button
              onClick={onAddReservationClick}
              color="primary"
              variant="contained"
              className={classesMain.commonButton}
              disabled={isLoading}
            >
              Add Reservation
            </Button>
          ) : (
            <Box>
              {' '}
              {location.state.first_name} {location.state.last_name}{' '}
            </Box>
          )}
        </Box>
        <ResTable
          isLoading={isLoading}
          data={reservs}
          isHistory={false}
          deleteRes={deleteRes}
        />
      </Container>
    </TablePageWrapper>
  );
};

export default Reservations;
