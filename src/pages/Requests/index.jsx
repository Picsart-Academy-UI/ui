import { useEffect, useMemo, useState } from 'react';
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

const allTeams = { team_name: 'All', _id: 'all' };

const Requests = () => {
  const classes = useStyles();
  const dispatch = useBatchDispatch();
  const [teamValue, setTeamValue] = useState(allTeams);
  const [usernameValue, setUsernameValue] = useState('');

  const {
    token,
    teams,
    pendingReservations,
    tables,
  } = useMemoSelector((state) => teamTokenSelector(state));
  const teamsList = useMemo(() => [allTeams, ...teams], [teams]);

  useEffect(() => {
    dispatch(
      fetchTeams(token),
      fetchPendingReservations(token),
      fetchTables(token)
    );
  }, [dispatch, token]);

  const handleTeamSelect = (val) => {
    setTeamValue(val);
  };
  const handleUsernameChange = (val) => {
    setUsernameValue(val);
  };

  return (
    <div className="requests">
      <Box className={classes.filterContainer}>
        <SelectDropdown
          label="Select Team"
          options={teamsList}
          property="team_name"
          className={classes.selectDropdown}
          // eslint-disable-next-line
          onChange={handleTeamSelect}
        />
        <Filter
          className={classes.filter}
          // eslint-disable-next-line
          onChange={handleUsernameChange}
        />
      </Box>

      <Box fontSize="h4.fontSize" my={3}>
        Active Requests
      </Box>
      <RequestsTable
        teams={teamsList}
        pendingReservations={pendingReservations}
        tables={tables}
        teamFilterValue={teamValue}
        usernameChangeValue={usernameValue}
      />
    </div>
  );
};

export default Requests;
