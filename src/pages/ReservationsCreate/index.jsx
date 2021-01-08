import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Button from '@material-ui/core/Button';
import Canvas from './components/Canvas/Canvas';
import useStyles from './styles';

const ReservationsCreate = () => {
  const styles = useStyles();

  // default value
  const defaultValue = new Date();
  defaultValue.setDate(defaultValue.getDate() + 1);

  // Mock Data
  const selectedChair = '2/4';
  const data = [
    { date: defaultValue, isFree: true, chair: selectedChair },
    { date: defaultValue, isFree: false, chair: selectedChair },
    { date: defaultValue, isFree: false, chair: selectedChair },
    { date: defaultValue, isFree: true, chair: selectedChair },
  ];

  return (
    <>
      <Container
        className={styles.topCont}
        display="flex"
        justifycontent="space-around"
      >
        <Box className={styles.text}>Select date:</Box>
        <TextField
          className={styles.datePicker}
          id="datetime-from"
          label="From"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
        />
        <TextField
          className={styles.datePicker}
          id="datetime-to"
          label="To"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
        />
      </Container>
      <Container
        className={styles.canvasCont}
        display="flex"
        justifycontent="space-around"
      >
        <TextField
          className={styles.selectedDate}
          id="datetimeSelected"
          type="datetime-local"
          defaultValue={defaultValue.toISOString().slice(0, 16)}
        />
        <Canvas></Canvas>
      </Container>
      <Container display="flex" justifycontent="space-around">
        <Table className={styles.table}>
          <TableBody>
            {data.map((item) => (
              <TableRow>
                <TableCell>{item.date.toISOString().slice(0, 16)}</TableCell>
                <TableCell>
                  {item.isFree ? (
                    <Box className={styles.isFreeBox}>
                      {' '}
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
                <TableCell>
                  {item.isFree ? (
                    item.chair
                  ) : (
                    <Button variant="contained" color="primary">
                      {' '}
                      Choose Another Seat{' '}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default ReservationsCreate;
