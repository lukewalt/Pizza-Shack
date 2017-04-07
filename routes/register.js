'use strict';

const { Router } = require('express');
const router = Router();

const user = require('../controllers/userCtrl');

router.get('/register', user.show);
router.post('/register', user.create)

module.exports = router
