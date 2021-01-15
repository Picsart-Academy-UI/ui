import { useState, useEffect } from 'react';
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
      const res = await makeRequest(requestData);
      dispatch(fetchedUsersList(res));
    };

    const fetchBySearch = async () => {
      const requestData = getUsersSearchRequestData(
        token,
        rowsPerPage,
        page + 1,
        searchValue
      );
      const searchedUsers = await makeRequest(requestData);
      // console.log('searchedUsers', searchedUsers);
      dispatch(fetchedUsersList(searchedUsers));
    };
    if (!searchValue) {
      fetchUsers();
    } else {
      // console.log('searchValue', searchValue);
      // console.log("page", page + 1);
      fetchBySearch();
    }
  }, [page, rowsPerPage, searchValue, dispatch, makeRequest, token]);

  useEffect(() => {
    const fetchTeams = async () => {
      const requestData = getTeamsAllRequestData(token);
      const getTeams = await makeRequest(requestData);
      // console.log('getTeams', getTeams);
      if (getTeams.data) {
        dispatch(setTeams(getTeams.data));
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
          <DropDown />
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
