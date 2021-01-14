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
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import useStyles from './style';

const Receipt = ({ reservs, chooseAnotherSeat }) => {
  const styles = useStyles();
  return (
    <Container className={styles.container}>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableBody>
            {reservs.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.date.toLocaleString('default', {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell align="center">
                  {item.isFree ? (
                    <Box className={styles.isFreeBox}>
                      free{' '}
                      <CheckCircleOutlineOutlinedIcon
                        className={styles.check}
                      />
                    </Box>
                  ) : (
                    <Box className={styles.isFreeBox}>
                      busy <CancelOutlinedIcon className={styles.cross} />
                    </Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  {item.isFree ? (
                    item.chair
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={chooseAnotherSeat}
                    >
                      Choose Another Seat
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className={styles.submitBtn}
        onClick={chooseAnotherSeat}
      >
        CheckOut
      </Button>
    </Container>
  );
};
export default Receipt;
