import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import SelectDropdown from '../../components/SelectDropdown';
import Filter from '../../components/Filter';
import { fetchTeams } from '../../store/slices/teamsSlice';
import RequestsTable from './RequestsTable';
import useStyles from './style';

const Requests = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signin.token);
  const teams = useSelector((state) => state.teams.teamsList);

  useEffect(() => {
    dispatch(fetchTeams(token));
  }, []);

  return (
    <div className="requests">
      <Box className={classes.filterContainer}>
        <SelectDropdown
          label="Select Team"
          options={teams}
          property="name"
          onChange={console.log}
        />
        <Filter className={classes.filter} onChange={console.log} />
      </Box>

      <Box fontSize="h4.fontSize" my={3}>
        Active Requests
      </Box>
      <RequestsTable />
    </div>
  );
};

export default Requests;
