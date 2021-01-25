import { useEffect, useState } from 'react';
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
  const teams = useSelector((state) => state.teams.teams);
  const [filterTeam, setFilterTeam] = useState([]);
  const makeRequest = useFetch();
  const dispatch = useDispatch();
  const classesLocal = useStylesLocal();

  const handleChange = (e) => {
    setFilterTeam(() =>
      teams.filter((item) =>
        item.team_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const getTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const res = await makeRequest(requestData);
      if (res.data) {
        dispatch(setTeams(res));
      }
    };

    getTeams();
  }, [dispatch, makeRequest, token]);

  useEffect(() => {
    setFilterTeam(teams);
  }, [teams]);

  return (
    <>
      <div className={classesLocal.wrapper}>
        <Search handleChange={handleChange} />
        <AddTeam />
      </div>
      <TeamsTable teams={filterTeam} />
    </>
  );
};

export default Teams;
