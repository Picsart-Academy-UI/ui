import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../pages/NotFound';

import Homepage from '../pages/Login/components/Homepage';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/signin" component={Homepage} />
      <Route path="/notFound" component={NotFound} />
      <Redirect exact from="/" to="/signin" />
      <Redirect to="/notFound" />
    </Switch>
  </BrowserRouter>
);

export default Router;
