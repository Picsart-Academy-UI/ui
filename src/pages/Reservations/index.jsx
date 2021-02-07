import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const query = useQuery();
  const user_id = query.get('user_id');
  const token = useSelector((state) => state.signin.token);
  const reservs = useSelector((state) => state.reservations.reservations);
  const dispatch = useDispatch();

  const deleteRes = (id, status) => {
    if (status === 'approved') {
      dispatch(deleteReservationRequest(token, id));
    } else {
      history.push('/requests');
    }
  };

  const onAddReservationClick = () => {
    const url = user_id
      ? `/reservations/create?user_id=${user_id}`
      : '/reservations/create';
    history.push(url);
  };

  useEffect(() => dispatch(fetchReservations(token, user_id)), [
    user_id,
    token,
    dispatch,
  ]);

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
          {!user_id ? (
            <Button
              onClick={onAddReservationClick}
              color="primary"
              variant="contained"
              className={classesMain.commonButton}
            >
              Add Reservation
            </Button>
          ) : null}
        </Box>
        <ResTable data={reservs} isHistory={false} deleteRes={deleteRes} />
      </Container>
    </TablePageWrapper>
  );
};

export default Reservations;
