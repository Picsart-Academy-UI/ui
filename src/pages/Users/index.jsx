import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import {
  getLimitedUsersRequestData,
  getUsersSearchRequestData,
} from '../../services/users';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
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

  useEffect(() => {
    const fetchUsers = async () => {
      const requestData = getLimitedUsersRequestData(
        token,
        rowsPerPage,
        page + 1
      );
      const users = await makeRequest(requestData);
      dispatch(fetchedUsersList(users));
    };

    const fetchBySearch = async () => {
      const requestData = getUsersSearchRequestData(
        token,
        rowsPerPage,
        page + 1,
        debouncedSearchValue
      );
      const searchedUsers = await makeRequest(requestData);
      dispatch(fetchedUsersList(searchedUsers));
    };
    if (!debouncedSearchValue) {
      fetchUsers();
    } else {
      fetchBySearch();
    }
  }, [page, rowsPerPage, debouncedSearchValue, dispatch, makeRequest, token]);

  useEffect(() => {
    const fetchTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const getTeams = await makeRequest(requestData);
      if (getTeams) {
        dispatch(setTeams(getTeams));
      }
    };
    if (!teams.length) {
      fetchTeams();
    }
  }, [teams, dispatch, makeRequest, token]);

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
          <DropDown teams={teams} />
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
