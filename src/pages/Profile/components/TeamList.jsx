import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from '../../../components/SelectDropdown';
import { fetchTeams } from '../../../store/slices/teamsSlice';

function TeamList({ changeCallback, isEditing, userTeam }) {
  const dispatch = useDispatch();
  const [defaultTeam, setDefaultTeam] = useState();
  const [options, setOptions] = useState([]);

  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  useEffect(() => {
    dispatch(fetchTeams(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (teams.length) {
      const teamItem = teams && teams.find((t) => t._id === userTeam);
      const optionsArr =
        teams && teams.map((t) => ({ title: t.team_name, id: t._id }));
      setDefaultTeam({ title: teamItem.team_name, id: teamItem._id });
      setOptions(optionsArr);
    }
  }, [teams, userTeam]);

  return (
    teams && (
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
