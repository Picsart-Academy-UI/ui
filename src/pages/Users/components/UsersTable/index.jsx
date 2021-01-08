import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@material-ui/core';
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

  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
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
            {rowsPerPage > 0 &&
              users.map((row) => <UserRow key={row._id} row={row} />)}

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
