import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Box, Typography, Container, Avatar, Button } from '@material-ui/core';
import { GOOGLE_LOGO } from '../../constants';
import useFetch from '../../hooks/useFetch';
import { setIsLoggedIn } from '../../store/slices/signinSlice';
import useStylesMain from '../../hooks/useStylesMain';
import getGoogleRequestData from '../../services/signinService';
import useStylesLocal from './style';

const SignIn = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();

  const makeRequest = useFetch();

  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    const request = getGoogleRequestData(response);
    const res = await makeRequest(request);
    if (res.token && res.data) {
      dispatch(setIsLoggedIn(res));
    }
  };

  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

  return (
    <>
      <Typography component="h1" variant="h4" className={classesLocal.header}>
        <div>We Make Office</div>
        <div>Space Management</div>
        <div>Awesome</div>
      </Typography>
      <Container component="div">
        <Box className={classesLocal.signInContainer}>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
    </>
  );
};

export default SignIn;
