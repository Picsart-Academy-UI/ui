import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL_PART } from '../../../constants';
import SelectDropdown from '../../../components/SelectDropdown';
import useFetch from '../../../hooks/useFetch';
import { getTeamsAllRequestData } from '../../../services/teams';

function TeamList(props) {
  const makeRequest = useFetch();

  const token = useSelector((state) => state.signin.token);

  const [teams, setTeams] = useState(null);

  const { changeCallback, isEditing, userTeam } = props;

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await makeRequest(
        getTeamsAllRequestData({ token, route: API_URL_PART.teams })
      );
      setTeams(data.data);
    };
    fetchTeams();
  }, [makeRequest, token]);

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
