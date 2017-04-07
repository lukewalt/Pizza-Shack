"use strict;"


// if we deploy it would use this var on the environment
const environment = process.env.NODE_ENV || 'development'

// it will go to knexfile and and
const config = require('../knexfile')[environment]

// when you run knex you are calling a function so we pass the config we established above
const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex);

//allows us to hash the user/password before saving them : never save password in database
bookshelf.plugin(require('bookshelf-bcrypt'));

module.exports = { knex, bookshelf };
