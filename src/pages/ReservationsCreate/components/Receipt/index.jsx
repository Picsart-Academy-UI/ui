import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Button from '@material-ui/core/Button';
import useStyles from './style';

const Receipt = ({ data }) => {
  const styles = useStyles();

  return (
    <Table className={styles.table}>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.date.toISOString().slice(0, 16)}</TableCell>
            <TableCell>
              {item.isFree ? (
                <Box className={styles.isFreeBox}>
                  free{' '}
                  <CheckCircleOutlineOutlinedIcon className={styles.check} />
                </Box>
              ) : (
                <Box className={styles.isFreeBox}>
                  busy <CancelOutlinedIcon className={styles.cross} />
                </Box>
              )}
            </TableCell>
            <TableCell>
              {item.isFree ? (
                item.chair
              ) : (
                <Button variant="contained" color="primary">
                  Choose Another Seat
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default Receipt;
