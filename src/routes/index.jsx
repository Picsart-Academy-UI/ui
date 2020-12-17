import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../pages/NotFound';
import SignIn from '../pages/SignIn';
import Profile from '../pages/Profile';
import Teams from '../pages/Teams';
import TeamsCreate from '../pages/TeamsCreate';
import TeamsEdit from '../pages/TeamsEdit';
import Users from '../pages/Users';
import UsersCreate from '../pages/UsersCreate';
import UsersEdit from '../pages/UsersEdit';
import Reservations from '../pages/Reservations';
import ReservationsCreate from '../pages/ReservationsCreate';
import ReservationsEdit from '../pages/ReservationsEdit';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/Reservations" component={Reservations} />
      <Route exact path="/Reservations/create" component={ReservationsCreate} />
      <Route exact path="/Reservations/edit" component={ReservationsEdit} />
      <Route exact path="/teams" component={Teams} />
      <Route exact path="/teams/create" component={TeamsCreate} />
      <Route exact path="/teams/edit" component={TeamsEdit} />
      <Route exact path="/Users" component={Users} />
      <Route exact path="/Users/create" component={UsersCreate} />
      <Route exact path="/Users/edit" component={UsersEdit} />
      <Route path="/notfound" component={NotFound} />
      <Redirect exact from="/" to="/signin" />
      <Redirect to="/notfound" />
    </Switch>
  </BrowserRouter>
);

export default Router;
