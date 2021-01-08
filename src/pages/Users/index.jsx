import { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { getLimitedUsersData } from '../../services/users';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();

  const dispatch = useDispatch();

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(page, 'useEffect page');
      const { url, options } = getLimitedUsersData(
        token,
        rowsPerPage,
        page + 1
      );
      const res = await makeRequest(url, options);
      console.log(res);
      dispatch(fetchedUsersList(res));
    };
    fetchData();
  }, [page, rowsPerPage]);

  const usersData = useSelector((state) => state.users);

  console.log(page, 'users/back clicked');
  return (
    <>
      <Box display="flex" justifyContent="center">
        <SearchBox />
        <DropDown />
      </Box>
      <AddUser />
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
