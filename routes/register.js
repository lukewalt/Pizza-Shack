'use strict';

const { Router } = require('express');

const router = Router();
const { show } = require('../controllers/aboutCtrl')

router.get('/register', show);

module.exports = router
