import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import countReducer from './count';

export default combineReducers({
  routing: routerReducer,
  count: countReducer,
  auth: authReducer
});
