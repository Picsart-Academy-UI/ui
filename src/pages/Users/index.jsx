import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import getLimitedUsersData from '../../services/users/getLimitedUsersData';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  const [page, setPage] = useState(1);
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
      const { url, options } = getLimitedUsersData(token, rowsPerPage, page);
      const res = await makeRequest(url, options);
      dispatch(fetchedUsersList(res));
    };
    fetchData();
  }, [page, rowsPerPage]);

  const usersData = useSelector((state) => state.users);

  console.log('Users render');

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
