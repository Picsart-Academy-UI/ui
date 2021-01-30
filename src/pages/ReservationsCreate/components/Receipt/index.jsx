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
  Modal,
} from '@material-ui/core';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { postReservation } from '../../../../services/reservationsService';
import { addReservation } from '../../../../store/slices/reservationsSlice';
import useDate from '../../../../hooks/useDate';
import useStyles from './style';

const Receipt = ({ reservs }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [numOfReservations, setNumOfReservations] = useState(0);
  const { transformDateLocale, transformDataISO } = useDate();
  const history = useHistory();
  const token = useSelector((state) => state.signin.token);
  const dispatch = useDispatch();
  const styles = useStyles();

  const handleCheckout = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      const callTheHR = async () => {
        if (numOfReservations !== reservs.length) {
          const { id, start_date, end_date } = reservs[numOfReservations];
          const res = await postReservation(token, {
            start_date: transformDataISO(start_date),
            end_date: transformDataISO(end_date),
            id,
            user_id: undefined,
            status: 'pending',
          });
          console.log(res);
          const promise = new Promise((resolve) => {
            setTimeout(() => resolve('a'), 2000);
          });
          await promise;
          dispatch(addReservation(res || []));
          setNumOfReservations((prev) => 1 + prev);
        } else {
          history.push('/');
        }
      };
      console.log('called');
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
                  <TableCell align="left">
                    {transformDateLocale(item.start_date)} -{' '}
                    {transformDateLocale(item.end_date)}
                  </TableCell>
                  <TableCell align="center">
                    <Box className={styles.isFreeBox}>
                      free{' '}
                      <CheckCircleOutlineOutlinedIcon
                        className={styles.check}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="right"> {item.chairName} </TableCell>
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
      <Modal open={isLoading} aria-labelledby="a box that shows te progress">
        <Container className={styles.modalCont}>
          <Box className={styles.joke}>
            Wait a bit while we call HR and talk everything out ...
          </Box>
          <Box className={styles.num}>
            {numOfReservations}/{reservs.length}
          </Box>
          <Box className={styles.warning}>
            if you will close this page then reservations won't complete
          </Box>
        </Container>
      </Modal>
    </>
  );
};
export default memo(Receipt);
