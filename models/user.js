"use strict;"

const { bookshelf } = require('../db/database');
const { compare } = require('bcryptjs');

// define our user
// take Model prop on bkshelf and apply it to the user that is being defined
const User = bookshelf.Model.extend({
  tableName: 'users',
  bcrypt: { field: 'password' },
  comparePass: function (passwordStr) {
    console.log('password string form user', passwordStr);
    console.log('user', this.attributes);
    // take password from input field and run it against hashed-password form user obj
    // compare mthod runs the exact hash algorithm on input field against
    return compare(passwordStr, this.attributes.password)
  }
}, {

  findOneByEmail: function (email) {
    return this.forge({ email })
    // gets user from databse based on email input field
    .fetch()
    //if the user comes back it is returned
    .then( user => {
      console.log("got user", user.get('email'));
      return user
    })
    //if no user, catch returns nothing
    .catch( () => {
      console.log('no email was given');
      return null
    })
  }

})


module.exports = User;
