'use strict'

const passport = require('passport');


module.exports.show = (req, res) =>
  res.render('login');

module.exports.create = (req, res, next) => {
  passport.authenticate('local', (err, user, msg) => {
    if (err) return next(err)
    if (!user) return res.render('login', { page: 'Login', msg})

    // calls serializeUser
    req.login(user, err => {
      if (err) return next(err)
      res.redirect('/')
    })

  })(req, res, next)
}

module.exports.edit = (req, res) => {
  res.render('logout', {page: "logout"})
};

module.exports.destroy = (req, res) => {
  req.logout();
  res.redirect('/login')
};
