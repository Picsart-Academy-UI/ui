import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useStylesLocal from './style';

const UsersCreate = () => {
  const styles = useStylesLocal();

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
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-team-native-simple">
                Team
              </InputLabel>
              <Select native id="grouped-native-select" label="Team">
                <option aria-label="None" value="" />
                <option>Team 1</option>
                <option>Team 2</option>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="position"
              label="Position"
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Is Admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.sbmtButton}
            >
              Save and Send Invitation
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default UsersCreate;
