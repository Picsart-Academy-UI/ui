import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import Loads from '../Loads';
import UserInfo from '../UserInfo';

const useStyles = makeStyles({
  table: {
    minWidth: 960,
  },
  button: {
    marginRight: 8,
  },
  range: {
    lineHeight: 1,
  },
  dateYear: {
    marginRight: 30,
  },
  loadsContainer: {
    height: 52,
    overflow: 'hidden',
    '&:hover': {
      position: 'relative',
      overflow: 'visible',
    },
  },
});

function createData(user, date, seat, load, actions) {
  return { user, date, seat, load, actions };
}

const rows = [
  createData(
    { name: 'Jon Snow', avatar: '', team: 'Monetization', position: 'Intern' },
    { range: '17 Dec - 19 Dec', year: '2020', days: 3 },
    '6/1',
    1,
    24
  ),
  createData(
    {
      name: 'Cersei Lannister',
      avatar: '',
      team: 'CMS',
      position: 'Software Engineer 1',
    },
    { range: '17 Dec - 17 Dec', year: '2020', days: 3 },
    '9/2',
    2,
    37
  ),
  createData(
    {
      name: 'Jaime Lannister',
      avatar: '',
      team: 'Corporate Affairs',
      position: 'Associate product manager',
    },
    { range: '17 Dec - 19 Dec', year: '2020', days: 3 },
    '1/6',
    3,
    24
  ),
  createData(
    { name: 'Arya Stark', avatar: '', team: 'Community', position: 'Intern' },
    { range: '17 Dec - 19 Dec', year: '2020', days: 3 },
    '3/7',
    4,
    67
  ),
  createData(
    {
      name: 'Daenerys Targaryen',
      avatar: '',
      team: 'International Growth',
      position: 'Product manager',
    },
    { range: '17 Dec - 10 Jan', year: '2020-2021', days: 3 },
    '1/6',
    5,
    49
  ),
];

function RequestsTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader className={classes.table} aria-label="requests table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Date Range</TableCell>
            <TableCell align="right">Seat</TableCell>
            <TableCell align="right">Load</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.user.name}>
              <TableCell component="th" scope="row">
                <UserInfo user={row.user} />
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" className={classes.range}>
                  {row.date.range}
                </Typography>
                <Box className={classes.subtext}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={classes.dateYear}
                  >
                    {row.date.year}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {row.date.days} days
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">{row.seat}</TableCell>
              <TableCell align="right">
                <Box className={classes.loadsContainer}>
                  <Loads loads={row.load} />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                >
                  Approve
                </Button>
                <Button variant="contained" color="secondary" size="small">
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RequestsTable;
