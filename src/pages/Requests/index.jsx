import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import SelectDropdown from '../../components/SelectDropdown';
import Filter from '../../components/Filter';
import useMemoSelector from '../../hooks/useMemoSelector';
import useBatchDispatch from '../../hooks/useBatchDispatch';
import { fetchTeams } from '../../store/slices/teamsSlice';
import { fetchTables } from '../../store/slices/tablesSlice';
import { fetchPendingReservations } from '../../store/slices/reservationsSlice';
import { teamTokenSelector } from '../../store/selectors';
import RequestsTable from './RequestsTable';
import useStyles from './style';

const Requests = () => {
  const classes = useStyles();
  const dispatch = useBatchDispatch();

  const {
    token,
    teams,
    pendingReservations,
    tables,
  } = useMemoSelector((state) => teamTokenSelector(state));
  console.log(teams, 'qqqqqqqqqqqqqq', pendingReservations, tables);
  useEffect(() => {
    dispatch(
      fetchTeams(token),
      fetchPendingReservations(token),
      fetchTables(token)
    );
  }, [dispatch, token]);

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
      <RequestsTable
        teams={teams}
        pendingReservations={pendingReservations}
        tables={tables}
      />
    </div>
  );
};

export default Requests;
