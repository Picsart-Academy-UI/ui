import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';

import { setIsLoggedIn } from '../../store/slices/signinSlice';
import useStylesMain from '../../hooks/style/useStylesMain';

import useStylesLocal from './useStylesLocal';

const SignIn = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSigninClick = () => {
    dispatch(setIsLoggedIn());
    history.replace('/reservations');
  };

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
          <Button className={classesLocal.buttonPcsrt} onClick={onSigninClick}>
            <Avatar src="images/glogo.png" className={classesLocal.glogo} />
            Sign In With Google
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
