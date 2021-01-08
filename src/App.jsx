import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Router from './routes';
import SignIn from './pages/SignIn';

const App = () => {
  const isLoggedIn = useSelector((state) => state.signin.isLoggedIn);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        {isLoggedIn ? (
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
