import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  CircularProgress,
} from '@material-ui/core';
import UserInfo from '../UserInfo';
import ScrollDialog from '../LoadsDialog';
import Snackbar from '../../../components/Snackbar';
import { approve } from '../../../store/slices/reservationsSlice';
import { tokenSelector } from '../../../store/selectors';
import {
  createRequestData,
  getYear,
  workingDaysBetweenDates,
} from '../../../utils/helpers';
import useMemoSelector from '../../../hooks/useMemoSelector';

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
  loadingContainer: {
    padding: '48px 0',
  },
});

function RequestsTable({
  teams,
  pendingReservations,
  tables,
  teamFilterValue,
  usernameChangeValue,
  loading,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [msgState, setMsgState] = useState({ open: false });
  const { token } = useMemoSelector((state) => tokenSelector(state));

  const handleApprove = async (reservationId) => {
    try {
      await dispatch(approve(token, reservationId));
      console.log('approved');
      setMsgState({
        open: true,
        type: 'success',
        message: 'Approved!',
      });
    } catch (e) {
      setMsgState({
        open: true,
        type: 'error',
        message: 'Something went wrong!',
      });
      console.log(e);
    }
  };

  const handleReject = () => {
    console.log('rejected');
  };

  const filteredRows = rows
    ?.filter((row) => {
      if (teamFilterValue.team_name === 'All') return true;
      return row.user.team === teamFilterValue.team_name;
    })
    .filter((row) =>
      row.user.name.toLowerCase().includes(usernameChangeValue.toLowerCase())
    );

  useEffect(() => {
    const r = pendingReservations?.map((pr) => {
      const {
        start_date,
        end_date,
        table_id,
        chair_id,
        team_id,
        user_id,
        _id: reservationId,
      } = pr;

      return createRequestData(
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
          year: getYear(start_date, end_date),
          days: workingDaysBetweenDates(
            new Date(start_date),
            new Date(end_date)
          ),
        },
        `${tables?.find((t) => t._id === table_id)?.table_name}/${
          chair_id?.number
        }`,
        5,
        reservationId
      );
    });
    setRows(r);
  }, [pendingReservations, tables, teams]);

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="requests table"
        >
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Date Range</TableCell>
              <TableCell align="right">Seat</TableCell>
              <TableCell align="right">Load</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {loading ? ( // eslint-disable-line
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={5}
                  className={classes.loadingContainer}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : !(filteredRows && filteredRows.length) ? (
            <TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={5}
                  className={classes.loadingContainer}
                >
                  <Typography variant="h4" component="div">
                    No requests!
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filteredRows?.map((row) => (
                <TableRow key={row.reservationId}>
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
                        {row.date.days} {row.date.days === 1 ? 'day' : 'days'}
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
                      onClick={() => handleApprove(row.reservationId)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <h1
        onClick={() =>
          setMsgState({
            open: true,
            type: 'success',
            message: 'Approved!',
          })
        }
      >
        Success
      </h1>
      <h1
        onClick={() =>
          setMsgState({
            open: true,
            type: 'error',
            message: 'not approved!',
          })
        }
      >
        Error
      </h1>
      {msgState.open && (
        <Snackbar
          type={msgState.type}
          message={msgState.message}
          isOpen={msgState.open}
          handleClose={() => setMsgState({ open: false })}
        />
      )}
    </>
  );
}

export default RequestsTable;
