'use strict';

const { Router } = require('express');

const router = Router();
const { show, addContact } = require('../controllers/contactCtrl')

router.get('/contact', show);
router.post('/contact', addContact);

module.exports = router
