import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
      const { url, options } = getTeamsAllRequestData(token);
      const data = await makeRequest(url, options);
      setTeams(data.teams);
    };
    fetchTeams();
  }, [makeRequest, token]);

  let defaultTeam;
  const options =
    teams &&
    teams.map((el) => {
      el._id === userTeam && (defaultTeam = { title: el.name, id: el._id });
      return { title: el.name, id: el._id };
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
