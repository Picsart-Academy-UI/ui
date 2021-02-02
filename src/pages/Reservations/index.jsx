import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Button } from '@material-ui/core';
import TablePageWrapper from '../../components/TablePageWrapper';
import {
  fetchPendingApprovedReservations,
  deleteReservationRequest,
} from '../../store/slices/reservationsSlice';
import useStylesMain from '../../hooks/useStylesMain';
import ResTable from './components/ResTable';
import useStylesLocal from './style';

const Reservations = () => {
  const classesMain = useStylesMain();
  const styles = useStylesLocal();

  const history = useHistory();

  const token = useSelector((state) => state.signin.token);
  const reservs = useSelector((state) => state.reservations.reservsApprPend);
  const dispatch = useDispatch();

  const deleteRes = (id) => {
    dispatch(deleteReservationRequest(token, id));
  };

  const onAddReservationClick = () => {
    history.push('/reservations/create');
  };

  useEffect(() => {
    dispatch(fetchPendingApprovedReservations(token));
  }, []);

  return (
    <TablePageWrapper>
      <Container>
        <Box
          display="flex"
          justifyContent="space-around"
          className={styles.boxHeader}
        >
          <Box> Active reservations </Box>
          <Button
            onClick={onAddReservationClick}
            color="primary"
            variant="contained"
            className={classesMain.commonButton}
          >
            Add Reservation
          </Button>
        </Box>
        <ResTable data={reservs} isHistory={false} deleteRes={deleteRes} />
      </Container>
    </TablePageWrapper>
  );
};

export default Reservations;
