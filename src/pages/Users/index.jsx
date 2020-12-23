import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import DropDown from './components/DropDown';
import UsersTable from './components/UsersTable';

const Users = () => {
  const handleInputChange = () => {};

  const handleAddClick = () => {};

  return (
    <>
      <Box display="flex" justifyContent="center" bgcolor="background.paper">
        <Box mt={3}>
          <TextField
            onChange={handleInputChange}
            name="searchTeam"
            id="searchTeam"
            placeholder="Search by name"
            autoFocus
          />
        </Box>
        <Box ml={8} mb={1}>
          <DropDown />
        </Box>
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
