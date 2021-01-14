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
import useStylesLocal from './style';

const UsersTable = ({
  rows,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const classes = useStylesLocal();

  const { data, count } = rows.usersList;

  // console.log('data', data);

  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    onChangeRowsPerPage(value);
  };

  const emptyRows =
    data && data.length
      ? rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
      : 0;

  return data && data.length ? (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="center">Surname</TableCell>
              <TableCell align="center">Team</TableCell>
              <TableCell align="center">Gmail</TableCell>
              <TableCell align="right">
                <Box mr={9}>Actions</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsPerPage > 0 &&
              data.map((user) => <UserRow key={user._id} user={user} />)}

            {emptyRows > 0 && (
              <TableRow>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        rows={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default UsersTable;
