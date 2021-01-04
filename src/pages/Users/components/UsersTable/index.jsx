import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import UserRow from '../UserRow';
import Pagination from '../../../../components/Pagination';

const UsersTable = ({
  rows,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const { users, count } = rows.usersList;
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage) => {
    // setPage(newPage);
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    // setRowsPerPage(value);
    // setPage(0);
    onChangeRowsPerPage(value);
  };

  const emptyRows =
    users && users.length
      ? rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)
      : 0;

  return users && users.length ? (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="center">Surname</TableCell>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center">Gmail</TableCell>
              <TableCell align="right">
                <Box mr={13}>Actions</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map((row) => (
              <UserRow key={row.name} row={row} />
            ))}

            {emptyRows > 0 && (
              <TableRow>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          rows={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default UsersTable;
