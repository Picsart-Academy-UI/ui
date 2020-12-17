import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';

import useStylesMain from '../../hooks/style/useStylesMain';

import useStylesLocal from './useStylesLocal';

function SignIn() {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();

  return (
    <div className={classesMain.paperContainer}>
      <Typography component="h1" variant="h4" className={classesLocal.header}>
        We Make Office Space Management
      </Typography>
      <Typography
        component="h1"
        variant="h4"
        className={`${classesLocal.header} ${classesLocal.colored}`}
      >
        AWESOME
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classesLocal.signInContainer}>
          <Button className={classesLocal.buttonPcsrt}>
            <Avatar src="images/glogo.png" className={classesLocal.glogo} />
            Sign In With Google
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default SignIn;
