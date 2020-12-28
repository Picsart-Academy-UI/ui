import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';
import useRequest from '../../hooks/http';
import { setIsLoggedIn } from '../../store/slices/signinSlice';
import useStylesMain from '../../hooks/style/useStylesMain';
import useStylesLocal from './style';

const SignIn = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();

  const { makeRequest } = useRequest();

  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = async (response) => {
    const res = await makeRequest(
      'http://localhost:6789/api/v1/auth/signin',
      'POST',
      {
        token: response.tokenId,
      }
    );

    if (res.token) {
      dispatch(setIsLoggedIn(res.token));
      history.replace('/reservations');
    } else {
      console.log('Error during google auth');
    }
  };

  return (
    <div className={classesMain.paperContainer}>
      <Typography component="h1" variant="h4" className={classesLocal.header}>
        We Make Office Space Management Awesome
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box className={classesLocal.signInContainer}>
          <GoogleLogin
            clientId="885648500880-etufj82ca1c83bsol4a04bvljs4lsouf.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classesLocal.buttonPicsart}
                onClick={renderProps.onClick}
              >
                <Avatar src="images/glogo.png" className={classesLocal.glogo} />
                Sign In With Google
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
