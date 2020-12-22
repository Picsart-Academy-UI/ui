import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from '../../../hooks/style/useStyles';

function Registration() {
  const classes = useStyles();

  return (
    <div className={classes.paperContainer}>
      <Typography component="h1" variant="h2" className={classes.header}>
        Invite User
      </Typography>
      <Container
        component="main"
        maxWidth="xs"
        className={classes.MuiContainerRoot}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              autoComplete="surname"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Save
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Send Invitation
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Registration;
