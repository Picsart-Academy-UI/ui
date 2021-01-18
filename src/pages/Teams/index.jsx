import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import { setTeams } from '../../store/slices/teamsSlice';
import TeamsTable from './components/TeamsTable';
import AddTeam from './components/AddTeam';
import Search from './components/Search';
import useStylesLocal from './style';

const Teams = () => {
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const dispatch = useDispatch();
  const classesLocal = useStylesLocal();

  const teamsData = useSelector((state) => state.teams.teams);
  useEffect(() => {
    const getTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const res = await makeRequest(requestData);
      if (res) {
        dispatch(setTeams(res));
      }
    };

    getTeams();
  }, [dispatch, makeRequest, token]);

  return (
    <>
      <div className={classesLocal.wrapper}>
        <Search />
        <AddTeam />
      </div>
      <TeamsTable teams={teamsData} />
    </>
  );
};

export default Teams;
