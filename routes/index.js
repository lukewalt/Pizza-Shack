'use strict';

const { Router } = require('express');
// instanciating our module from Routers that we will export
const router = Router();

//public routes; anyone can visit login or not
router.use(require('./about'))
router.use(require('./contact'))
// router.use(require('./login'))
// router.use(require('./register'))
router.use(require('./root'))

// login guard MIDDLEWARE. send back home if not register
// router.use( (req, res, next) => {
//   // defined
//   if (req.isAuthenticated()) {
//     next()
//   } else {
//     res.redirect('./login')
//   }
// })

//private Routes
// router.use(require('./logout'))
router.use(require('./orders'))


module.exports = router
