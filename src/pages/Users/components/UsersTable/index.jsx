import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import UserRow from '../UserRow';

const createData = (name, surName, team, gmail, position, birthDay) => ({
  name,
  surName,
  team,
  gmail,
  additionalInfo: {
    date: birthDay,
    position,
  },
});

const rows = [
  createData(
    'User 1',
    'Dalakyan',
    'Team 2',
    'us231.dalakyan@gmail.com',
    'Junior 1',
    '12.10.1999'
  ),
  createData(
    'User 2',
    'Mkrtchyan',
    'Team 5',
    'us432.mkrtchyan@gmail.com',
    'Senior 3',
    '14.02.1993'
  ),
  createData(
    'User 3',
    'Ayvazyan',
    'Team 1',
    'us121.ayvazyan@gmail.com',
    'Midlle 2',
    '29.10.1997'
  ),
  createData(
    'User 4',
    'Gevorgyan',
    'Team 3',
    'us674.gevorgyan@gmail.com',
    'Junior 3',
    '14.05.1998'
  ),
  createData(
    'User 5',
    'Ananyan',
    'Team 4',
    'us456.ananyan@gmail.com',
    'Middle 1',
    '17.06.1997'
  ),
];

const UsersTable = () => (
  <TableContainer component={Paper}>
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell align="center">SurName</TableCell>
          <TableCell align="center">Team</TableCell>
          <TableCell align="center">Gmail</TableCell>
          <TableCell align="right">
            <Box mr={5}>Actions</Box>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <UserRow key={row.name} row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UsersTable;
