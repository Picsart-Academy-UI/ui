import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';
import SearchBox from './components/SearchBox';

const Users = () => {
  const handleAddClick = () => {};

  return (
    <>
      <Box display="flex" justifyContent="center">
        <SearchBox />
        <DropDown />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Box mr={3} m={1}>
          <Button onClick={handleAddClick} color="primary" variant="contained">
            Add User
          </Button>
        </Box>
      </Box>
      <UsersTable />
    </>
  );
};

export default Users;
