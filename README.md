# Simple Firebase based vote app

The purpose of this tiny repo is to demonstrate logging in to Firebase and reading/writing data with sockets.

## Get started

* Pull down the repo
* Run `npm i`
* Add a config file with firebase credentials in `/src/config.js`:

    module.exports = {

      FIREBASE_CONFIG: {

          apiKey: "",
          authDomain: "",
          databaseURL: "",
          storageBucket: "",
          messagingSenderId: ""

        },
    };
* Launch via `npm start`
