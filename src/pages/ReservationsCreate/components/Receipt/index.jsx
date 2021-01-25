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
import useStyles from './style';

const Receipt = ({ reservs }) => {
  const styles = useStyles();
  return (
    <Container className={styles.container}>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableBody>
            {reservs.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left">
                  {item.startDate.toLocaleString('default', {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                  })}{' '}
                  -{' '}
                  {item.endDate.toLocaleString('default', {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell align="center">
                  <Box className={styles.isFreeBox}>
                    free{' '}
                    <CheckCircleOutlineOutlinedIcon className={styles.check} />
                  </Box>
                </TableCell>
                <TableCell align="right"> {item.chairName} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" className={styles.submitBtn}>
        CheckOut
      </Button>
    </Container>
  );
};
export default Receipt;
