import * as fb from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const firebase = fb.initializeApp(FIREBASE_CONFIG);

// stub, add handle error library
const handleErr = (err) => {
  const message = err.message ? err.message : 'Unknown error occurred.';
  console.log({
    type: 'ERROR_MESSAGE',
    message
  });
};

/*
 * Firebase Authentication Routes
 */

/**
 * This function creates a user. Will automatically
 * sign in new user or return an error
 * @param {string} email this is the user's email.
 * @param {string} password this is the user's password.
 * @param {function} cb callback function; called on success.
 */
export function createUserAccount (email, password, cb) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(cb)
    .catch(handleErr);
}

/**
 * This function logs in a user.
 * @param {string} email this is the user's email.
 * @param {string} password  this is the user's password.
 * @param {function} cb callback function; called on success.
 * @return will log in the user or return an error.
 */
export function loginUser (email, password, cb) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(cb)
    .catch(handleErr);
}

/**
 * This function will check the current user.
 * @param {function} userCb this is function called when a user is successfully retrieved.
 * @param {function} noUserCb this is function called when a user is not retrieved.
 * @return will return userCb on success and noUserCb on fail.
 */
export function checkUser (userCb, noUserCb) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userCb(user);
    } else {
      if (noUserCb) noUserCb();
    }
  });
}

/**
 * This function returns the current user.
 * @param {function} cb callback function; called on success.
 * @return the user object, or null if no one is logged in.
 */
export function getCurrentUser (cb) {
  firebase.auth().getCurrentUser
    .then(cb)
    .catch(handleErr);
}

/**
 * This function logs out a user.
 * @param {function} cb callback function; called on success.
 * @return will log out the user.
 */
export function logoutUser (cb) {
  firebase.auth().signOut()
    .then(cb)
    .catch(handleErr);
}

/**
 * This function sends an email to the provided email address with a link to
 * update their password.
 * @param {string} email this is the user's email.
 * @param {function} cb callback function; called on success.
 * @return will email the user a link to reset password.
 */
export function sendPasswordResetEmail (email, cb) {
  firebase.auth().sendPasswordResetEmail(email)
    .then(cb)
    .catch(handleErr);
}

export const Auth = {
  loginUser,
  checkUser,
  getCurrentUser,
  logoutUser,
  createUserAccount,
  sendPasswordResetEmail
};

/*
* Firebase Database Routes
*/

/**
 * Reads a value from the FB database.
 * @param {string} path database url path.
 * @param {function} cb callback function; called on success.
 */
export function read (path, cb) {
  firebase.database().ref(path).once('value')
    .then((success) => {
      cb(success.val());
    })
    .catch(handleErr);
}

/**
 * Reads a static snapshot of the contents at a given database path
 * when change is made to that data.
 * @param {string} path the relative object path in the database.
 * @param {function} cb callback function; called on success.
 * @param {string} e the event type.
 */
export function listenOn (path, cb, e) {
  const event = e || 'value';
  return firebase.database().ref(path).on(event, cb);
}

/**
 * Turns the listener off.
 * @param {string} path the relative object path in the database.
 */
export function listenOff (path) {
  return firebase.database().ref(path).off();
}

/**
 * Creates or replaces data at the specified path in the database.
 * @param {string} path the relative object path in the database.
 * @param {object} dataObj the data object to be saved.
 * @param {function} cb callback function; called on success.
 */
export function create (path, dataObj, cb) {
  firebase.database().ref(path).set(dataObj)
    .then(cb)
    .catch(handleErr);
}

/**
 * This function pushes an object to an array in the database.
 * @param {string} path the path to the array in the database.
 * @param {object} dataObj the data object to be saved.
 * @param {function} cb callback function; called on success.
 */
export function push (path, dataObj, cb) {
  return firebase.database().ref(path).push(dataObj)
    .then(cb)
    .catch(handleErr);
}

/**
 * This function pushes an object to an array in the database
 * then adds a reference to any object that needs it
 * @param {string} path the path to the array in the database.
 * @param {object} dataObj the data object to be saved.
 * @param {object} bind id's and paths to objects that need to know about this.
 * @param {function} cb callback function; called on success.
 */
// export function addItemAndBind (path, dataObj, bind, cb) {
//   return function () {
//     var bindKeys = Object.keys(bind);
//     for (var i = 0; i < bindKeys.length; i++) {
//       dataObj[bindKeys[i]] = { [bind[bindKeys[i]]]: true }
//     }
//     var Obj = firebase.database().ref(path).push(dataObj);
//     var objKey = Obj.getKey();
//     for (var i = 0; i < bindKeys.length; i++) {
//       var bindPath = `${bindKeys[i]}/${bind[bindKeys[i]]}/${path}/${objKey}`;
//       firebase.database().ref(bindPath).set(true)
//     }
//   }
//     .then(cb)
//     .catch(handleErr);
// }

/**
 * Updates data at the specified path in database.
 * @param {string} path the relative object path in the database.
 * @param {object} dataObj the data object to be updated.
 * @param {function} cb callback function; called on success.
 */
export function update (path, dataObj, cb) {
  firebase.database().ref(path).update(dataObj)
    .then(cb)
    .catch(handleErr);
}

/**
 * Deletes the data at the specified path in the database.
 * @param {string} path the relative path to the data in the database.
 * @param {function} cb callback function; called on success.
 */
export function remove (path, cb) {
  return firebase.database().ref(path).remove()
    .then(cb)
    .catch(handleErr);
}

export const Database = {
  read,
  listenOn,
  listenOff,
  create,
  push,
  update,
  remove
};

/*
* Firebase Queue Functions
*/

/**
 * Pushes a new task to a specified queue.
 * @param {string} task - path to queue in firebase.
 * @param {object} dataObj - object of data to be given to the workers.
 * @param {function} cb - callback function.
 */
export function pushTask (task, dataObj, cb) {
  const ref = firebase.database().ref(task);
  ref.child('tasks').push(dataObj)
    .then(cb)
    .catch(handleErr);
}

export const Queue = {
  pushTask
};

export const Firebase = {
  Auth,
  Database,
  Queue
};
