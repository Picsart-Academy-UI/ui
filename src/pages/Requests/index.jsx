import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import SelectDropdown from '../../components/SelectDropdown';
import Filter from '../../components/Filter';
import useMemoSelector from '../../hooks/useMemoSelector';
import useBatchDispatch from '../../hooks/useBatchDispatch';
import { fetchTeams } from '../../store/slices/teamsSlice';
import { fetchPendingReservations } from '../../store/slices/reservationsSlice';
import { teamTokenSelector } from '../../store/selectors';
import RequestsTable from './RequestsTable';
import useStyles from './style';

const Requests = () => {
  const classes = useStyles();
  const dispatch = useBatchDispatch();

  const { token, teams } = useMemoSelector((state) => teamTokenSelector(state));
  useEffect(() => {
    dispatch(fetchTeams(token), fetchPendingReservations(token));
  }, [dispatch, token]);

  // useEffect(() => {
  //   if(pendingReservations?.length) {
  //     console.log('fetch users || fetch teams || fetch chair || fetch table');
  //     const users = unique(pendingReservations.map(pr => pr.user_id));
  //     const promises = [];
  //     for (let i = users.length - 1; i >= 0; i--) {
  //       promises.push(getSingleUser(token, users[i]));
  //     }
  //     Promise.all(promises)
  //       .then(users1 => console.log(users1, '====='))
  //   }
  // }, [pendingReservations, token])

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
