import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStylesMain from '../../../hooks/style/useStylesMain';
import useStylesCustom from '../useStylesCustom';

function Homepage({ onForgotPasswordClick }) {
  const classesMain = useStylesMain();
  const classesCustom = useStylesCustom();

  return (
    <div className={classesMain.paperBackgroundImage}>
      <Typography component="h1" variant="h2" className={classesCustom.header}>
        Office Space Management
      </Typography>
      <Container
        component="main"
        maxWidth="xs"
        className={classesCustom.MuiContainerRoot}
      >
        <CssBaseline />
        <div className={classesCustom.paper}>
          <form className={classesCustom.form} noValidate>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classesCustom.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={onForgotPasswordClick}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
}

export default Homepage;
