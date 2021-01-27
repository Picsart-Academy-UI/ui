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
  count,
  page,
  rowsPerPage,
  isAdmin,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const classes = useStylesLocal();

  const { data } = rows;
  // console.log('data', data);

  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    onChangeRowsPerPage(value);
  };

  return data ? (
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
              {isAdmin && (
                <TableCell align="right">
                  <Box mr={9}>Actions</Box>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {data && !data.length ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>Nothing Found</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rowsPerPage > 0 &&
                data.map((user) => (
                  <UserRow key={user._id} user={user} isAdmin={isAdmin} />
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isAdmin && (
        <Pagination
          rows={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  ) : (
    <>
      <h1>Loading</h1>
    </>
  );
};

export default UsersTable;
