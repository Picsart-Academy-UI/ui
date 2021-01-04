import { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { getLimitedUsersData } from '../../services/users';
import { fetchedUsersList } from '../../store/slices/usersSlice';
import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';
import AddUser from './components/AddUser';

const Users = () => {
  // const [limit, setLimit] = useState(5);
  // const [page, setPage] = useState(1);
  const limit = 5;
  const page = 1;
  const token = useSelector((state) => state.signin.token);
  const makeRequest = useFetch();
  const { url, options } = getLimitedUsersData(token, limit, page);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await makeRequest(url, options);
      dispatch(fetchedUsersList(res));
    };
    fetchData();
  }, []);

  const usersData = useSelector((state) => state.users);

  console.log('usersData', usersData);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <SearchBox />
        <DropDown />
      </Box>
      <AddUser />
      <UsersTable rows={usersData} />
    </>
  );
};

export default Users;
