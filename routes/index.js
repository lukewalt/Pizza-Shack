'use strict';

const { Router } = require('express');
const router = Router();

// public routes
router.use(require('./about'))
router.use(require('./contact'))
router.use(require('./login'))
router.use(require('./register'))
router.use(require('./root'))

// // login guard middleware. Send 'em back home if not registered'
// TODO: define isAuthenticated
router.use( (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login')
  }
});

// private routes
router.use(require('./orders'))
router.use(require('./logout'))

module.exports = router;
