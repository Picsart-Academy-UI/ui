import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import {
  getLimitedUsersRequestData,
  getFilteredUsersRequestData,
} from '../../services/users';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import TeamsDropDown from './components/TeamsDropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 100);
  const { token, teams } = useSelector((state) => ({
    token: state.signin.token,
    teams: state.teams.teams,
  }));

  const makeRequest = useFetch();

  const dispatch = useDispatch();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleInputChange = (value) => {
    setSearchValue(value);
  };

  const handleSelectedTeamChange = (teamId) => {
    // console.log('selectedTeamId', teamId);
    setSelectedTeamId(teamId);
  };

  useEffect(() => {
    if (!teams.length) {
      const fetchTeams = async () => {
        const requestData = getTeamsAllRequestData(token);
        const getTeams = await makeRequest(requestData);
        if (getTeams.data) {
          dispatch(setTeams(getTeams));
        }
      };
      fetchTeams();
    }
  }, [teams, dispatch, makeRequest, token]);

  useEffect(() => {
    if (!debouncedSearchValue && selectedTeamId === '') {
      const fetchUsers = async () => {
        const requestData = getLimitedUsersRequestData(
          token,
          rowsPerPage,
          page + 1
        );
        const users = await makeRequest(requestData);
        dispatch(fetchedUsersList(users));
      };
      fetchUsers();
    } else if (debouncedSearchValue || selectedTeamId !== '') {
      const fetchBySelectedTeam = async () => {
        const requestData = getFilteredUsersRequestData(
          token,
          rowsPerPage,
          page + 1,
          selectedTeamId,
          debouncedSearchValue
        );
        const selectedUsers = await makeRequest(requestData);
        dispatch(fetchedUsersList(selectedUsers));
      };
      fetchBySelectedTeam();
    }
  }, [
    page,
    rowsPerPage,
    debouncedSearchValue,
    selectedTeamId,
    dispatch,
    makeRequest,
    token,
  ]);

  const usersData = useSelector((state) => state.users);
  // console.log('usersData', usersData);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <SearchBox
            value={searchValue}
            onChange={handleInputChange}
            onPageChange={handleChangePage}
          />
        </Grid>
        <Grid item xs>
          <TeamsDropDown
            teams={teams}
            onSelectChange={handleSelectedTeamChange}
          />
        </Grid>
        <Grid item xs>
          <AddUser />
        </Grid>
      </Grid>
      <UsersTable
        rows={usersData}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Users;
