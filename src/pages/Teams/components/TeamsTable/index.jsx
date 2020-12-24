import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TeamRow from '../TeamRow';
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
];

const TeamsTable = () => {
  const classes = useStylesLocal();

  return (
    <TableContainer component={Paper}>
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
          {rows.map((row) => (
            <TeamRow
              name={row.name}
              membersCount={row.membersCount}
              tablesCount={row.tablesCount}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamsTable;
