"use strict;"

const passport = require('passport');
const { Strategy } = require('passport-local');
const { knex } = require('../db/database');

const User = require('../models/user');

// after user login, this persists info in session cookie: attaches to the session as req.session.passport.user
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser( (id, done) => {
  //knex query; first instance
  knex('users').where({id}).first()
  .then( user => done(null, user) )
  .catch( err => done(err, null) )
})

// define middleware function for what we call on passport
const localStrategy = new Strategy({

  usernameField: 'email',
  passwordField: 'password'

  },
  (email, passwordStr, done) => {
    // method came from model.. fx = go find this person
    User.findOneByEmail(email)
    .then( user => {
      // if we get a user match, run the password
      if (user) {
        return Promise.all([
          user,
          user.comparePass(passwordStr)
        ])
      }
      // if there is no match , done is called with no match
      done(null, null, { msg: 'Email does not exist in our system'})
    })
    .then( ([user, matches]) => {

      if (matches) {
        done(null, user, { msg: 'Sucessful Login'})
      } else {
        done(null, null, {msg: 'Password does not match'})
      }

    })
    .catch(done)
})

passport.use(localStrategy)
