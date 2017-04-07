"use strict;"

const User = require('../models/user');

module.exports.show = (req, res) => {
  res.render('register', { page: 'Register' });
};

module.exports.create = ({ body: {email, password, confirmation } }, res) => {
  if (password === confirmation) {
    User.findOneByEmail(email)
    .then(user => {

      if (user) {
        return res.render('register', { msg: 'Email is already registered'})
      }
      // registers user
      return User
        .forge({email, password})
        .save()
        .then( () => {  res.redirect('/') })
        //catch for the save
        .catch( (err) => { res.render('register', { msg: 'Dang these was a problem try again'}) } )
    })
    // catch for findOneByEmail
    .catch( (err) => { res.render('register', { msg: 'Dang these was a problem try again'}) } )


  } else {
    res.render('register', { msg: 'oops, password does not match'})
  }

}
