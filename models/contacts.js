"use strict;"

// pulling our bookshelf export from database
const { bookshelf } = require('../db/database');

const Contact = bookshelf.Model.extend({
  tableName: 'contacts'
})

module.exports = Contact;
