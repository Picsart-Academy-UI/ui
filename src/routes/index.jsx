import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../pages/NotFound';

import SignIn from '../pages/SignIn';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route path="/notfound" component={NotFound} />
      <Redirect exact from="/" to="/signin" />
      <Redirect to="/notfound" />
    </Switch>
  </BrowserRouter>
);

export default Router;
