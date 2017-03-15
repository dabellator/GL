import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './Services/Store';
import createRoutes from './Containers';

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      {createRoutes(store)}
    </Router>
  </Provider>
  , document.getElementById('root')
);
