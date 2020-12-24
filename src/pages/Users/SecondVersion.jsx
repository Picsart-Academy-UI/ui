import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Box from '@material-ui/core/Box';
import DropDown from './components/DropDown';
import useStylesLocal from './style';

const Users = () => {
  const classes = useStylesLocal();

  const createData = (name, surName, team, gmail, position) => ({
    name,
    surName,
    team,
    gmail,
    position,
  });

  const rows = [
    // rows array containing each row as object
    createData(
      'User 1',
      'Dalakyan',
      'Team 2',
      'us231.dalakyan@gmail.com',
      'Junio 1'
    ),
    createData(
      'User 2',
      'Mkrtchyan',
      'Team 5',
      'us432.mkrtchyan@gmail.com',
      'Senior 3'
    ),
    createData(
      'User 3',
      'Ayvazyan',
      'Team 1',
      'us121.ayvazyan@gmail.com',
      'Midlle 2'
    ),
    createData(
      'User 4',
      'Gevorgyan',
      'Team 3',
      'us674.gevorgyan@gmail.com',
      'Junior 3'
    ),
    createData(
      'User 5',
      'Ananyan',
      'Team 4',
      'us456.ananyan@gmail.com',
      'Middle 1'
    ),
  ];

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  const handleInputChange = () => {};

  const handleAddClick = () => {};

  return (
    <>
      <Box display="flex" justifyContent="center" bgcolor="background.paper">
        <Box mt={3}>
          <TextField
            onChange={handleInputChange}
            name="searchTeam"
            id="searchTeam"
            placeholder="Search by name"
            autoFocus
          />
        </Box>
        <Box ml={8} mb={1}>
          <DropDown />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box m={1}>
          <Button onClick={handleAddClick} color="primary" variant="contained">
            Add User
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">SurName</TableCell>
              <TableCell align="right">Team</TableCell>
              <TableCell align="right">Gmail</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">
                <Box mr={5}>Actions</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.surName}</TableCell>
                <TableCell align="right">{row.team}</TableCell>
                <TableCell align="right">{row.gmail}</TableCell>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary">
                    Book a seat
                  </Button>
                  <Button
                    title="Edit"
                    onClick={handleEditClick}
                    color="primary"
                  >
                    <EditOutlinedIcon />
                  </Button>
                  <Button
                    title="Delete"
                    onClick={handleDeleteClick}
                    color="secondary"
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
