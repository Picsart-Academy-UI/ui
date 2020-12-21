import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const ReservationsCreate = () => {
  const create = () => {};
  // default values
  const defaultFromValue = new Date();
  defaultFromValue.setDate(defaultFromValue.getDate() + 1);
  console.log(defaultFromValue.toISOString());
  return (
    <>
      <Container onClick={create}>
        <Box>
          Select date:
          <TextField
            id="datetime-from"
            label="From"
            type="datetime-local"
            defaultValue={defaultFromValue.toISOString()}
          />
        </Box>
      </Container>
    </>
  );
};

export default ReservationsCreate;
