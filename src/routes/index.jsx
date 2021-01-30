import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Teams from '../pages/Teams';
import TeamsCreate from '../pages/TeamsCreate';
import TeamsEdit from '../pages/TeamsEdit';
import Users from '../pages/Users';
import UsersInvite from '../pages/UsersInvite';
import UsersEdit from '../pages/UsersEdit';
import Reservations from '../pages/Reservations';
import ReservationsCreate from '../pages/ReservationsCreate';
import ReservationsEdit from '../pages/ReservationsEdit';
import Requests from '../pages/Requests';
import useStylesMain from '../hooks/useStylesMain';
import { ROUTES } from '../constants';

const Router = () => {
  const classesMain = useStylesMain();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.signin);

  const isPageContainTable = Object.values(ROUTES).some(
    (path) => path === location.pathname
  );

  return (
    <div
      className={classesMain.paperPadding}
      style={{ width: isPageContainTable ? '80%' : '100%' }}
    >
      <Switch>
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/reservations" component={Reservations} />
        <Route path="/reservations/create" component={ReservationsCreate} />
        <Route exact path="/reservations/edit" component={ReservationsEdit} />
        <Route exact path="/teams" component={Teams} />
        <Route exact path="/teams/create" component={TeamsCreate} />
        <Route exact path="/teams/edit/:id" component={TeamsEdit} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/invite" component={UsersInvite} />
        <Route exact path="/users/edit" component={UsersEdit} />
        <Route exact path="/requests" component={Requests} />
        <Route path="/notfound" component={NotFound} />
        {isLoggedIn && <Redirect exact from="/" to="/reservations" />}
        {isLoggedIn && <Redirect exact from="/signin" to="/reservations" />}
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
};
export default Router;
