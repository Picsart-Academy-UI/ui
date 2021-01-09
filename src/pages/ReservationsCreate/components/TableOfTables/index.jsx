import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from './style';

const TableOfTables = ({
  dateRefs,
  data = [{ name: '2/4', dates: ['free'] }],
}) => {
  const styles = useStyles();
  console.log(dateRefs);
  const Dates = dateRefs.map((item) => new Date(item));
  console.log(Dates);
  return (
    <TableContainer>
      <Table>
        <TableHead className={styles.name}>
          <TableRow>
            <TableCell>Chair</TableCell>
            {dateRefs.map((item) => (
              <TableCell>{item.getDate()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {data.map((item) => (
              <>
                <TableCell>{item.name}</TableCell>
                {item.dates.map((status) => (
                  <TableCell>{status}</TableCell>
                ))}
              </>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfTables;
