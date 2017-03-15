import React from 'react';
import { Route } from 'react-router';

import App from './App';
import Login from './Login';
import Register from './Register';
import GLPage from './GLPage';

export default function (store) {
  return (
    <div>
      <Route path='/' component={App}>
        <Route path='/:firstItem/:secondItem' component={GLPage} />
      </Route>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  );
}
