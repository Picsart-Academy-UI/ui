import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import getAllTeams from '../../../services/profile/getAllTeams';

function TeamList(props) {
  const makeRequest = useFetch();

  const { curUserTeam } = props;
  const token = useSelector((state) => state.signin.token);

  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const { url, options } = getAllTeams(token);
      const data = await makeRequest(url, options);
      console.log(data.teams);
      setTeams(data.teams);
    };
    fetchTeams();
  }, []);

  return (
    Array.isArray(teams) &&
    teams.map((el, i) => (
      <option value={i} selected={el._id === curUserTeam}>
        {el.name}
      </option>
    ))
  );
}
export default TeamList;
