import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from '../../../components/SelectDropdown';
import useFetch from '../../../hooks/useFetch';
import { setTeams } from '../../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../../services/teams';

function TeamList(props) {
  const makeRequest = useFetch();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.signin.token);

  // const [teams, setTeams] = useState(null);

  const { changeCallback, isEditing, userTeam } = props;

  useEffect(() => {
    const fetchTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const res = await makeRequest(requestData);
      if (res) {
        dispatch(setTeams(res));
      }
    };
    fetchTeams();
  }, [dispatch, makeRequest, token]);

  const teams = useSelector((state) => state.teams.teams);

  let defaultTeam;
  const options =
    teams &&
    teams.map((el) => {
      if (el._id === userTeam)
        defaultTeam = { title: el.team_name, id: el._id };
      return { title: el.team_name, id: el._id };
    });

  return (
    Array.isArray(teams) && (
      <SelectDropdown
        label={''}
        options={options}
        onChange={changeCallback}
        isDisabled={!isEditing}
        defaultValue={defaultTeam}
        style={{ width: 250 }}
        variant={'standard'}
      />
    )
  );
}
export default TeamList;
