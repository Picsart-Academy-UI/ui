import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const AddUser = () => {
  const handleAddClick = () => {};

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box mr={3} m={1}>
        <Button onClick={handleAddClick} color="primary" variant="contained">
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default AddUser;
