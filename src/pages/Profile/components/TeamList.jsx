import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import { getTeamsAllRequestData } from '../../../services/teams';

function TeamList() {
  const makeRequest = useFetch();

  // const { curUserTeam } = props;
  const token = useSelector((state) => state.signin.token);

  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const { url, options } = getTeamsAllRequestData(token);
      const data = await makeRequest(url, options);
      setTeams(data.teams);
    };
    fetchTeams();
  }, [makeRequest, token]);

  return (
    Array.isArray(teams) &&
    teams.map((el, i) => (
      <option value={i} key={i}>
        {el.name}
      </option>
    ))
  );
}
export default TeamList;
