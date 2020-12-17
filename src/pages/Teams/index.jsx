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

import useStylesLocal from './style';

const Teams = () => {
  const classes = useStylesLocal();

  const createData = (name, memberCount) => ({ name, memberCount });

  const rows = [
    // rows array containing each row as object
    createData('Team 1', 6),
    createData('Team 2', 10),
    createData('Team 3', 12),
    createData('Team 4', 8),
    createData('Team 5', 5),
  ];

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  const handleInputChange = () => {};

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
        <Box m={1}>
          <Button color="primary" variant="contained">
            Add Team
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Teams</TableCell>
              <TableCell align="right">MemberCount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.memberCount}</TableCell>
                <TableCell align="right">
                  <Button
                    title="Edit"
                    onClick={handleEditClick}
                    color="primary"
                  >
                    <EditOutlinedIcon></EditOutlinedIcon>
                  </Button>
                  <Button
                    title="Delete"
                    onClick={handleDeleteClick}
                    color="secondary"
                  >
                    <DeleteOutlineIcon></DeleteOutlineIcon>
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

export default Teams;
