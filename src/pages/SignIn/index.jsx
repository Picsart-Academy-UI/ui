// import {useState} from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Box, Typography, Container, Avatar, Button } from '@material-ui/core';
import { GOOGLE_LOGO, GOOGLE_CLIENT_ID } from '../../constants';
import makeFetch from '../../services';
import { getGoogleRequestData } from '../../services/authService';
import { setIsLoggedIn } from '../../store/slices/signinSlice';
import useStylesMain from '../../hooks/useStylesMain';
import useStylesLocal from './style';

const SignIn = () => {
  const classesMain = useStylesMain();
  const classesLocal = useStylesLocal();
  // const [isButtonReady, setIsButtonReady] = useState(false);
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    console.log(111);
    const res = await makeFetch(getGoogleRequestData(response));
    if (res.token && res.data) {
      dispatch(setIsLoggedIn(res));
    }
  };

  return (
    <div className={classesMain.paperContainer}>
      <Typography component="h1" variant="h4" className={classesLocal.header}>
        <div>We Make Office</div>
        <div>Space Management</div>
        <div>Awesome</div>
      </Typography>
      <Container component="div">
        <Box className={classesLocal.signInContainer}>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => {
              const { disabled, onClick } = renderProps;
              return (
                <Button
                  className={classesLocal.buttonGoogle}
                  onClick={onClick}
                  variant="outlined"
                  disabled={disabled}
                >
                  <Avatar
                    src={GOOGLE_LOGO}
                    className={classesLocal.google}
                    style={{ opacity: disabled ? '0.5' : '1' }}
                  />
                  Sign in with Google
                </Button>
              );
            }}
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
