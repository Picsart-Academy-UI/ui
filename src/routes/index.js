import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../components/NotFound';

import Homepage from '../pages/Login/components/Homepage';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/notFound" component={NotFound} />
      <Redirect to="/notFound" />
    </Switch>
  );
}

export default Router;
