import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Router from './routes';
import SignIn from './pages/SignIn';
import registerSw from './services/registerSW';

const App = () => {
  const token = useSelector((state) => state.signin.token);
  const user = useSelector((state) => state.signin.curUser);

  if (token) {
    registerSw(token, user);
  }

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        {token ? (
          <>
            <Header />
            <Router />
          </>
        ) : (
          <>
            <Route exact path="/signin" component={SignIn} />
            <Redirect from="/" to="/signin" />
          </>
        )}
      </BrowserRouter>
    </>
  );
};
export default App;
