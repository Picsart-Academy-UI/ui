import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Button,
} from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import LoadingModal from '../LoadingModal';
import makeFetch from '../../../../services';
import { postReservation } from '../../../../services/reservationsService';
import {
  addReservation,
  setSelected,
} from '../../../../store/slices/reservationsSlice';
import useQuery from '../../../../hooks/useQuery';
import { transformDateLocale } from '../../../../utils/dateHelper';
import useStyles from './style';

const Receipt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [numOfReservations, setNumOfReservations] = useState(0);
  const history = useHistory();
  const token = useSelector((state) => state.signin.token);
  const userTeamId = useSelector((state) => state.signin.curUser.team_id);
  const reservs = useSelector(
    (state) => state.reservations.selectedReservations
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const styles = useStyles();

  const handleCheckout = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const callTheHR = async () => {
        if (numOfReservations !== reservs.length) {
          const queryUserId = query.get('id');
          const queryTeamId = query.get('team_id');
          const { id, start_date, end_date, table_id } = reservs[
            numOfReservations
          ];
          const res = await makeFetch(
            postReservation(token, {
              start_date: start_date.toISOString(),
              end_date: end_date.toISOString(),
              chair_id: id,
              table_id,
              user_id: queryUserId !== null ? queryUserId : undefined,
              team_id: queryTeamId !== null ? queryTeamId : userTeamId,
            })
          );
          console.log(res);
          const promise = new Promise((resolve) => {
            setTimeout(() => resolve('a'), 2000);
          });
          await promise;
          if (res?.data) {
            dispatch(addReservation(res.data || []));
          }
          setNumOfReservations((prev) => 1 + prev);
        } else {
          dispatch(setSelected([]));
          history.push('/');
        }
      };
      callTheHR();
    }
  }, [isLoading, numOfReservations]);

  return (
    <>
      <Container className={styles.container}>
        <TableContainer className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableBody>
              {reservs.map((item) => (
                <TableRow key={Math.floor(Math.random() * 1000000)}>
                  <TableCell>
                    {transformDateLocale(item.start_date)} -{' '}
                    {transformDateLocale(item.end_date)}
                  </TableCell>
                  <TableCell>
                    <Box className={styles.isFreeBox}>
                      free{' '}
                      <CheckCircleOutlineOutlinedIcon
                        className={styles.check}
                      />
                    </Box>
                  </TableCell>
                  <TableCell> {item.chairName} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          className={styles.submitBtn}
          onClick={handleCheckout}
        >
          CheckOut
        </Button>
      </Container>
      <LoadingModal
        isLoading={isLoading}
        numOfReservations={numOfReservations}
        limit={reservs.length}
      />
    </>
  );
};
export default memo(Receipt);
