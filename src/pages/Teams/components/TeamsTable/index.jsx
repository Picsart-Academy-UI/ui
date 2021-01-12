import { useState } from 'react';
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
import TeamRow from '../TeamRow';
import Pagination from '../../../../components/Pagination';
import useStylesLocal from './style';

const createData = (name, membersCount, tablesCount) => ({
  name,
  membersCount,
  tablesCount,
});

const rows = [
  // rows array containing each row as object
  createData('Team 1', 6, 1),
  createData('Team 2', 10, 2),
  createData('Team 3', 12, 2),
  createData('Team 4', 8, 2),
  createData('Team 5', 5, 1),
  createData('Team 6', 5, 1),
  createData('Team 7', 5, 1),
];

const TeamsTable = () => {
  const classes = useStylesLocal();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper} test="table-cntnr">
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Teams</TableCell>
            <TableCell align="center">MembersCount</TableCell>
            <TableCell align="center">TablesCount</TableCell>
            <TableCell align="right">
              <Box mr={5}>Actions</Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, i) => (
            <TeamRow
              name={row.name}
              membersCount={row.membersCount}
              tablesCount={row.tablesCount}
              key={i}
            />
          ))}

          {emptyRows > 0 && (
            <TableRow>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        test="pgn"
      />
    </TableContainer>
  );
};

export default TeamsTable;
