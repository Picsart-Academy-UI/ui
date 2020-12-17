import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';

import useStyles from '../../../hooks/style/useStyles';

function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.paperContainer}>
      <Typography component="h1" variant="h4" className={classes.header}>
        We Make Office Space Management
      </Typography>
      <Typography
        component="h1"
        variant="h4"
        className={`${classes.header} ${classes.colored}`}
      >
        AWESOME
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.signInContainer}>
          <Button className={classes.buttonPcsrt}>
            <Avatar src="images/glogo.png" className={classes.glogo} />
            Sign In With Google
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Homepage;
