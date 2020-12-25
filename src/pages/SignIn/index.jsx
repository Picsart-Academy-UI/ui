import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';
import { setIsLoggedIn } from '../../store/slices/signinSlice';
import useStylesMain from '../../hooks/style/useStylesMain';
import useStylesLocal from './style';

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
        We Make Office Space Management Easy
        <div>Awesome</div>
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box className={classesLocal.signInContainer}>
          <Button
            className={classesLocal.buttonPicsart}
            onClick={onSigninClick}
          >
            <Avatar src="images/glogo.png" className={classesLocal.glogo} />
            Sign In With Google
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
