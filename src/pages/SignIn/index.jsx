import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Box, Typography, Container, Avatar, Button } from '@material-ui/core';
import { API_URL_PART, GOOGLE_LOGO } from '../../constants';
import useFetch from '../../hooks/useFetch';
import { setIsLoggedIn } from '../../store/slices/signinSlice';
import useStylesMain from '../../hooks/useStylesMain';
import getGoogleRequestData from '../../services/signin';
import useStylesLocal from './style';

const SignIn = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();

  const makeRequest = useFetch();

  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    const request = getGoogleRequestData({
      body: response,
      route: API_URL_PART.authSignIn,
    });
    const res = await makeRequest(request);
    if (res.token && res.data) {
      dispatch(setIsLoggedIn(res));
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
                className={classesLocal.buttonGoogle}
                onClick={renderProps.onClick}
                variant="outlined"
              >
                <Avatar src={GOOGLE_LOGO} className={classesLocal.google} />
                Sign in with Google
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
