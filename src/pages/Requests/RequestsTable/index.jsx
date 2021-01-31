import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
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
import useStylesMain from '../../../hooks/useStylesMain';
import UserInfo from '../UserInfo';
import Snackbar from '../../../components/Snackbar';
import ButtonLoading from '../../../components/ButtonLoading';
import AlertDialog from '../../../components/AlertDialog';
import { approve, reject } from '../../../store/slices/reservationsSlice';
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
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  const classesMain = useStylesMain();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [msgState, setMsgState] = useState({ open: false });
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [resId, setResId] = useState(null);
  const { token } = useMemoSelector((state) => tokenSelector(state));

  const [views, setViews] = useState([]);

  const showView = async (row) => {
    const View = await lazy(() => import('../LoadsDialog'));
    setViews([<View row={row} key={1} />]);
  };

  const handleRemoveModalOpen = useCallback((reservationId) => {
    setRemoveModalOpen(true);
    setResId(reservationId);
  }, []);
  const handleRemoveModalClose = useCallback(
    () => setRemoveModalOpen(false),
    []
  );

  const handleApprove = useCallback(
    async (reservationId) => {
      try {
        const response = await dispatch(approve(token, reservationId));
        if (response.error || response instanceof Error) {
          throw new Error(response);
        }
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
    },
    [dispatch, token]
  );

  const handleReject = useCallback(
    async (reservationId) => {
      try {
        const response = await dispatch(reject(token, reservationId));
        if (response.error || response instanceof Error) {
          throw new Error(response);
        }
        setMsgState({
          open: true,
          type: 'info',
          message: 'Rejected!',
        });
      } catch (e) {
        setMsgState({
          open: true,
          type: 'error',
          message: 'Something went wrong!',
        });
        console.log(e);
      }
    },
    [dispatch, token]
  );

  const handleDeleteClick = async () => {
    await handleReject(resId);
    handleRemoveModalClose();
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
          avatar: user_id?.profile_picture,
          team: teams?.find((t) => t._id === team_id)?.team_name,
          position: user_id?.position,
          teamCount: teams?.find((t) => t._id === team_id)?.members_count,
          teamId: team_id,
        },
        {
          start: start_date,
          end: end_date,
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
        `${tables?.find((t) => t._id === table_id)?.table_number || 0}/${
          chair_id?.number
        }`,
        5,
        reservationId
      );
    });
    setRows(r);
  }, [pendingReservations, tables, teams]);
  const notFound = !(filteredRows && filteredRows.length);

  return (
    <>
      <TableContainer
        component={Paper}
        className={`${classes.tableContainer} ${classesMain.tableContainer}`}
      >
        <Table
          stickyHeader
          className={clsx(classes.table, {
            [classesMain.tableEmpty]: loading || notFound,
          })}
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
            <TableBody className={classesMain.tableBody}>
              <TableRow className={classesMain.tableRow}>
                <TableCell
                  align="center"
                  colSpan={5}
                  className={clsx(
                    classes.loadingContainer,
                    classesMain.tableCell
                  )}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : notFound ? (
            <TableBody className={classesMain.tableBody}>
              <TableRow className={classesMain.tableRow}>
                <TableCell
                  align="center"
                  colSpan={5}
                  className={clsx(
                    classes.loadingContainer,
                    classesMain.tableCell
                  )}
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
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => showView(row)}
                    >
                      See Load
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <div className={classes.actionsContainer}>
                      <ButtonLoading
                        className={`${classes.button} ${classesMain.commonButton}`}
                        onClick={handleApprove}
                        size="small"
                        reservationId={row.reservationId}
                      >
                        Approve
                      </ButtonLoading>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleRemoveModalOpen(row.reservationId)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {msgState.open && (
        <Snackbar
          type={msgState.type}
          message={msgState.message}
          isOpen={msgState.open}
          handleClose={() => setMsgState({ open: false })}
        />
      )}
      <AlertDialog
        open={removeModalOpen}
        handleClose={handleRemoveModalClose}
        handleDeleteClick={handleDeleteClick}
        titleText="Are you sure?"
        deleteText="Reject"
      />
      <Suspense fallback="Loading...">
        <div>{views}</div>
      </Suspense>
    </>
  );
}

export default RequestsTable;
