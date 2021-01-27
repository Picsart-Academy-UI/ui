import React, { useEffect, useState } from 'react';
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
import UserInfo from '../UserInfo';
import ScrollDialog from '../LoadsDialog';

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
});

function createData(user, date, seat, load, actions) {
  return { user, date, seat, load, actions };
}

function RequestsTable({
  teams,
  pendingReservations,
  tables,
  teamFilterValue,
  usernameChangeValue,
}) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const filteredRows = rows
    .filter((row) => {
      if (teamFilterValue.team_name === 'All') return true;
      return row.user.team === teamFilterValue.team_name;
    })
    .filter((row) =>
      row.user.name.toLowerCase().includes(usernameChangeValue.toLowerCase())
    );

  useEffect(() => {
    const r = pendingReservations.map((pr) => {
      const { start_date, end_date, table_id, chair_id, team_id, user_id } = pr;
      return createData(
        {
          name: `${user_id?.first_name} ${user_id?.last_name}`,
          avatar: '',
          team: teams?.find((t) => t._id === team_id)?.team_name,
          position: user_id?.position,
        },
        {
          range: `${new Date(start_date)?.toLocaleString('en-EN', {
            month: 'short',
            day: 'numeric',
          })} - ${new Date(end_date)?.toLocaleString('en-EN', {
            month: 'short',
            day: 'numeric',
          })}`,
          year: '2020-2021',
          days: 3,
        },
        `${tables?.find((t) => t._id === table_id)?.table_name}/${
          chair_id?.number
        }`,
        5,
        49
      );
    });
    setRows(r.slice(2));
  }, [pendingReservations]);

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
          {filteredRows.map((row) => (
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
                <ScrollDialog />
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
