import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectDropdown from '../../../components/SelectDropdown';
import useFetch from '../../../hooks/useFetch';
import { setTeams } from '../../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../../services/teams';

function TeamList({ changeCallback, isEditing, userTeam }) {
  const makeRequest = useFetch();
  const dispatch = useDispatch();
  const [defaultTeam, setDefaultTeam] = useState();
  const [options, setOptions] = useState([]);

  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  const fetchTeams = useCallback(async () => {
    const res = await makeRequest(getTeamsAllRequestData(token));
    if (res.data) {
      dispatch(setTeams(res));
    }
  }, [token, makeRequest, dispatch]);

  useEffect(() => {
    if (!teams.length) {
      fetchTeams();
    }
  }, [teams, fetchTeams]);

  useEffect(() => {
    if (teams.length) {
      const teamItem = teams.find((t) => t._id === userTeam);
      const optionsArr = teams.map((t) => ({ title: t.team_name, id: t._id }));
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
