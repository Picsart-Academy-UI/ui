import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../store/slices/teamsSlice';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import {
  getLimitedUsersRequestData,
  getFilteredUsersRequestData,
} from '../../services/users';
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
  const [fetched, setFetched] = useState(false);
  const { token, isAdmin, teams, usersData } = useSelector((state) => ({
    token: state.signin.token,
    isAdmin: state.signin.curUser.is_admin,
    teams: state.teams.teams,
    usersData: state.users.usersList,
  }));

  // console.log('isAdmin', isAdmin);
  // console.log('usersData', usersData);

  const users = useMemo(
    () => ({
      data: (usersData.data || []).filter(({ first_name }) =>
        first_name.toLowerCase().startsWith(searchValue.toLowerCase())
      ),
    }),
    [usersData.data, searchValue]
  );

  const usersCount = isAdmin ? usersData.count || 0 : users.data.length;
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
    setSelectedTeamId(teamId);
  };

  useEffect(() => {
    if (!users.data?.length && page !== 0 && usersCount / rowsPerPage <= page) {
      setPage(page - 1);
    }
  }, [users.data?.length, page, usersCount, rowsPerPage]);

  useEffect(() => {
    if (!teams.length) {
      const fetchTeams = async () => {
        const requestData = getTeamsAllRequestData(token);
        const getTeams = await makeRequest(requestData);
        if (getTeams.data) {
          dispatch(setTeams(getTeams.data));
        }
      };
      fetchTeams();
    }
  }, [teams, dispatch, makeRequest, token]);

  useEffect(() => {
    if (!debouncedSearchValue && selectedTeamId === '' && !fetched) {
      const fetchUsers = async () => {
        const requestData = getLimitedUsersRequestData(
          token,
          rowsPerPage,
          page + 1,
          isAdmin
        );
        const fetchedUsers = await makeRequest(requestData);
        dispatch(fetchedUsersList(fetchedUsers));
      };

      fetchUsers();

      if (!isAdmin) {
        setFetched(true);
      }
    } else if ((isAdmin && debouncedSearchValue) || selectedTeamId !== '') {
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

  // console.log({ users, page, usersCount, rowsPerPage });

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
        {isAdmin && (
          <>
            <Grid item xs>
              <TeamsDropDown
                teams={teams}
                onSelectChange={handleSelectedTeamChange}
              />
            </Grid>
            <Grid item xs>
              <AddUser />
            </Grid>
          </>
        )}
      </Grid>
      <UsersTable
        rows={users}
        count={usersCount}
        page={page}
        rowsPerPage={rowsPerPage}
        isAdmin={isAdmin}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default Users;
