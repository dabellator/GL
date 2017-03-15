import Api from '../Services/Api';
import { browserHistory } from 'react-router';

/**
 * Creates a user account and profile
 * @param {string} firstName - user first name
 * @param {string} lastName - user last name
 * @param {string} email - user email
 * @param {string} password - user account password
 * @returns {function} dispatch
 */
export function createUser (email, password) {
  return (dispatch) => {
    Api().Auth.createUserAccount(email, password, (success) => {
      dispatch({ type: 'SUCCESS_MESSAGE', message: 'Account created successfully.' });
      browserHistory.push(`/`)
    });
  };
}

/**
 * Logs into user's account
 * @param {string} email - user email
 * @param {string} password - user account password
 * @returns {function} dispatch
 */
export function loginUser (email, password) {
  return (dispatch) => {
    Api().Auth.loginUser(email, password, (success) => {
      dispatch({ type: 'SUCCESS_MESSAGE', message: 'Account logged in successfully.' });
      browserHistory.push(`/`)
    });
  };
}

export function checkUser () {
  return (dispatch) => {
    Api().Auth.checkUser((user) => {
        console.log('LOGGED IN: ', user);
        dispatch({ type: 'SET_CURRENT_USER', uid: user.uid });
      }, () => {
        console.log('No one here');
        browserHistory.push('/login');
      });
  }
}

/**
 * Logs out of user's account
 * @returns {function} dispatch
 */
export function logoutUser () {
  return (dispatch) => {
    Api().Auth.logoutUser((success) => {
      dispatch({ type: 'SUCCESS_MESSAGE', message: 'User logged out successfully.' })
    });
  };
}
