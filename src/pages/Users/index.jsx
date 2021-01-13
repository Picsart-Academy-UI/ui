import { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../store/slices/teamsSlice';
import { getTeamsAllRequestData } from '../../services/teams';
import useFetch from '../../hooks/useFetch';
import { getLimitedUsersData, getUsersBySearch } from '../../services/users';
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
      const { url, options } = getLimitedUsersData(
        token,
        rowsPerPage,
        page + 1
      );
      const res = await makeRequest(url, options);
      // console.log(res);
      dispatch(fetchedUsersList(res));
    };

    const fetchBySearch = async () => {
      console.log('searchValue', searchValue);
      const { url, options } = getUsersBySearch(
        token,
        rowsPerPage,
        page + 1,
        searchValue
      );
      const searchedUsers = await makeRequest(url, options);
      console.log('searchedUsers', searchedUsers);
      dispatch(fetchedUsersList(searchedUsers));
    };
    if (!searchValue) {
      fetchUsers();
    } else {
      fetchBySearch();
    }
  }, [page, rowsPerPage, searchValue, dispatch, makeRequest, token]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { url, options } = getTeamsAllRequestData(token);
      try {
        const getTeams = await makeRequest(url, options);
        // console.log('getTeams', getTeams);
        if (getTeams.data) {
          dispatch(setTeams(getTeams.data));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (!teams.length) {
      fetchTeams();
    }
  }, [teams]);

  // useEffect(() => {
  //   const fetchBySearch = async () => {
  //     const {url, options} = getUsersBySearch(token, rowsPerPage,page + 1, searchValue);
  //   }
  //   if(searchValue){

  //   }
  // }, [searchValue]);

  const usersData = useSelector((state) => state.users);
  // console.log('usersData', usersData);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <SearchBox value={searchValue} onChange={handleInputChange} />
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
