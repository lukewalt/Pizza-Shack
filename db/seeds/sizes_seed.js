"use strict;"

const { knex } = require('../database');
const sizes = require('./sizes');

console.log('sizes', sizes);


exports.seed = function(knex, Promise) {
  const sizePromises = sizes.map( ({name, inches}) => {
    // writing definitions for queries and pushing each one to a new array
    return knex('sizes').insert({ name, inches });

  })
  // Deletes ALL existing entries
  return knex('sizes').del()
    .then(() => {
      // Inserts seed entries from above definition in map fx
      return Promise.all(sizePromises)
    });
};
