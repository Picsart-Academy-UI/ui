import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Teams from '../pages/Teams';
import TeamsCreate from '../pages/TeamsCreate';
import TeamsEdit from '../pages/TeamsEdit';
import Users from '../pages/Users';
import UsersInvite from '../pages/UsersInvite';
import Reservations from '../pages/Reservations';
import ReservationsCreate from '../pages/ReservationsCreate';
import ReservationsEdit from '../pages/ReservationsEdit';
import Requests from '../pages/Requests';
import useStylesMain from '../hooks/useStylesMain';
import Tables from '../pages/Tables';
import TablesCreate from '../pages/TablesCreate';

const Router = () => {
  const classesMain = useStylesMain();

  const { isLoggedIn, isAdmin } = useSelector((state) => ({
    isLoggedIn: state.signin.isLoggedIn,
    isAdmin: state.signin.curUser.is_admin,
  }));

  return (
    <div className={classesMain.paperPadding}>
      <Switch>
        {isAdmin && <Route exact path="/profile/:id" component={Profile} />}
        <Route exact path="/reservations" component={Reservations} />
        <Route path="/reservations/create" component={ReservationsCreate} />
        <Route exact path="/reservations/edit" component={ReservationsEdit} />

        <Route exact path="/users" component={Users} />
        {isAdmin && (
          <Route exact path="/users/invite" component={UsersInvite} />
        )}
        {isAdmin && <Route exact path="/teams" component={Teams} />}
        {isAdmin && <Route exact path="/requests" component={Requests} />}
        {isAdmin && (
          <Route exact path="/teams/create" component={TeamsCreate} />
        )}
        {isAdmin && (
          <Route exact path="/teams/edit/:id" component={TeamsEdit} />
        )}
        {isAdmin && <Route exact path="/tables" component={Tables} />}
        {isAdmin && (
          <Route exact path="/tables/create" component={TablesCreate} />
        )}
        {isAdmin && <Route exact path="/tables/:id" component={Tables} />}
        <Route path="/notfound" component={NotFound} />
        {isLoggedIn && <Redirect exact from="/" to="/reservations" />}
        {isLoggedIn && <Redirect exact from="/signin" to="/reservations" />}
        <Redirect to="/notfound" />
      </Switch>
    </div>
  );
};
export default Router;
