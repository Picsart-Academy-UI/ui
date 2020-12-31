import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStylesLocal from './style';

const UsersCreate = () => {
  const classesLocal = useStylesLocal();

  const [dateType, setDateType] = useState('text');

  const onDateTypeFocus = () => {
    console.log(dateType);
    setDateType('date');
  };

  const onDateTypeBlur = () => {
    console.log(dateType);
    setDateType('text');
  };

  const [checkedB, setCheckedB] = useState(true);

  const handleChange = (event) => {
    setCheckedB(event.target.checked);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="date"
              label="Birthday"
              type={dateType}
              onFocus={onDateTypeFocus}
              onBlur={onDateTypeBlur}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="team"
              label="Team"
              defaultValue="5fe23d54a710eb52a9fe0835"
              disabled
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="position"
              label="Position"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedB}
                  onChange={handleChange}
                  name="admin"
                  color="primary"
                />
              }
              label="Admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classesLocal.sbmtButton}
            >
              Send Invitation
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UsersCreate;
