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
import Box from '@material-ui/core/Box';

import TeamRow from './components/TeamRow';

import useStylesLocal from './style';

const Teams = () => {
  const classes = useStylesLocal();

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

  const handleInputChange = () => {};

  const handleAddClick = () => {};

  return (
    <>
      <Box display="flex" justifyContent="center" bgcolor="background.paper">
        <Box>
          <TextField
            onChange={handleInputChange}
            name="searchTeam"
            id="searchTeam"
            margin="normal"
            placeholder="Search by name"
            autoFocus
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box mr={3} m={1}>
          <Button onClick={handleAddClick} color="primary" variant="contained">
            Add Team
          </Button>
        </Box>
      </Box>

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
    </>
  );
};

export default Teams;
