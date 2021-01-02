import { Switch, Route, Redirect } from 'react-router-dom';
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
import useStylesMain from '../hooks/style/useStylesMain';

const Router = () => {
  const classesMain = useStylesMain();

  const isLoggedIn = useSelector((state) => state.signin.isLoggedIn);

  return (
    <div className={classesMain.paperPadding}>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/reservations" component={Reservations} />
        <Route
          exact
          path="/reservations/create"
          component={ReservationsCreate}
        />
        <Route exact path="/reservations/edit" component={ReservationsEdit} />
        <Route exact path="/teams" component={Teams} />
        <Route exact path="/teams/create" component={TeamsCreate} />
        <Route exact path="/teams/edit" component={TeamsEdit} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/invite" component={UsersInvite} />
        <Route exact path="/users/edit" component={UsersEdit} />
        <Route path="/notfound" component={NotFound} />
        {isLoggedIn && <Redirect exact from="/" to="/reservations" />}
        {isLoggedIn && <Redirect exact from="/signin" to="/reservations" />}
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
};
export default Router;
