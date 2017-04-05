"use strict;"

const { Router } = require('express');

const router = Router();
const { show, create } = require('../controllers/orderCtrl');


router.get('/order', show)
router.post('/order', create)

module.exports = router;
