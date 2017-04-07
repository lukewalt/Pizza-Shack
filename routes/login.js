'use strict';

const { Router } = require('express');
const router = Router();

const session = require('../controllers/sessionCtrl')

router.get('/login', session.show);
router.post('/login', session.create);

module.exports = router
