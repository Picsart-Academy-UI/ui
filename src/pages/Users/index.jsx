import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import getLimitedUsersData from '../../services/users/getLimitedUsersData';
import { fetchedUsersList, getUsers } from '../../store/slices/usersSlice';
import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  const limit = 5;
  const page = 2;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmViNzViMTc5ZDMxMWRlZDkwNzk2ZDEiLCJlbWFpbCI6Imppci5hdmV0aXN5YW5AZ21haWwuY29tIiwidGVhbV9pZCI6IjVmZTIzZDU0YTcxMGViNTJhOWZlMDgzNSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2MDk2MTE4NTV9.lGOm36pzveWEazaqOdyx8jwXD7N4K3Wg7qfpl9dFhcQ';
  const makeRequest = useFetch();
  const { url, options } = getLimitedUsersData(token, limit, page);

  const dispatch = useDispatch();

  // console.log("users",makeRequest(url, options));

  // const res = await makeRequest(url, options);
  // console.log("res",res)

  useEffect(async () => {
    const res = await makeRequest(url, options);
    dispatch(fetchedUsersList(res));
  }, []);

  const usersList = useSelector(getUsers);

  console.log('reRendering');
  console.log('usersList', usersList);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <SearchBox />
        <DropDown />
      </Box>
      <AddUser />
      <UsersTable rows={usersList} />
    </>
  );
};

export default Users;
