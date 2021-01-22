import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import SelectDropdown from '../../components/SelectDropdown';
import Filter from '../../components/Filter';
import { fetchTeams } from '../../store/slices/teamsSlice';
import RequestsTable from './RequestsTable';
import { fetchPendingReservations } from '../../store/slices/reservationsSlice';
import useStyles from './style';

const Requests = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signin.token);
  const teams = useSelector((state) => state.teams.teams);
  const pendingReservations = useSelector(
    (state) => state.reservations.pendingReservations
  );
  useEffect(() => {
    dispatch(fetchTeams(token));
    dispatch(fetchPendingReservations(token));
  }, [dispatch, token]);
  console.log(pendingReservations, 'pendingReservations ___');
  return (
    <div className="requests">
      <Box className={classes.filterContainer}>
        <SelectDropdown
          label="Select Team"
          options={teams}
          property="team_name"
          className={classes.selectDropdown}
          // eslint-disable-next-line
          onChange={console.log}
        />
        <Filter
          className={classes.filter}
          // eslint-disable-next-line
          onChange={console.log}
        />
      </Box>

      <Box fontSize="h4.fontSize" my={3}>
        Active Requests
      </Box>
      <RequestsTable />
    </div>
  );
};

export default Requests;
