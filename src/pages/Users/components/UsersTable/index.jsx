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
import Pagination from '../../../../components/Pagination';
import useStylesMain from '../../../../hooks/useStylesMain';
import UserRow from '../UserRow';

const UsersTable = ({
  rows,
  count,
  page,
  rowsPerPage,
  isAdmin,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const classesMain = useStylesMain();
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
      <TableContainer className={classesMain.tableContainer}>
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
                <TableCell
                  align="center"
                  colSpan={6}
                  className={classesMain.searchRes}
                >
                  Nothing Found
                </TableCell>
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
