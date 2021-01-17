import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import { setTeams } from '../../store/slices/teamsSlice';
import TeamsTable from './components/TeamsTable';
import AddTeam from './components/AddTeam';
import SearchBox from './components/SearchBox';

const Teams = () => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const dispatch = useDispatch();

  const teamsData = useSelector((state) => state.teams.teamsList);
  useEffect(() => {
    const getTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const res = await makeRequest(requestData);
      if (res) {
        dispatch(setTeams(res));
      }
    };

    getTeams();
  });

  return (
    <>
      <SearchBox />
      <AddTeam />
      <TeamsTable teams={teamsData} />
    </>
  );
};

export default Teams;
