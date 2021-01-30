import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import SelectDropdown from '../../components/SelectDropdown';
import Filter from '../../components/Filter';
import useMemoSelector from '../../hooks/useMemoSelector';
import { fetchPendingReservationsWithData } from '../../store/slices/reservationsSlice'; // eslint-disable-line
import { tokenSelector } from '../../store/selectors';
import RequestsTable from './RequestsTable';
import useStyles from './style';

const allTeams = { team_name: 'All', _id: 'all' };

const Requests = () => {
  const classes = useStyles();
  const [teamValue, setTeamValue] = useState(allTeams);
  const [loading, setLoading] = useState(false);
  const [usernameValue, setUsernameValue] = useState('');
  const dispatch = useDispatch();

  const { token } = useMemoSelector((state) => tokenSelector(state));
  const pendingReservationsWithData = useMemoSelector(
    (state) => state.reservations.pendingReservationsWithData
  );
  const { teams, pendingReservations, tables } = pendingReservationsWithData;
  const teamsList = useMemo(() => [allTeams, ...teams], [teams]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPendingReservationsWithData(token)).finally(() =>
      setLoading(false)
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
          onChange={handleTeamSelect}
        />
        <Filter className={classes.filter} onChange={handleUsernameChange} />
      </Box>

      <Box fontSize="h4.fontSize" my={3}>
        Active Requests
      </Box>
      <RequestsTable
        loading={loading}
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
