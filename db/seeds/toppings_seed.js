"use strict;"
const toppings = require('./toppings');

exports.seed = (knex, Promise) => {
  console.log(toppings);
  let toppingsPromises = toppings.map( ({name}) => {
    return knex('toppings').insert({name});
  });

  // Deletes ALL existing entries
  return knex('toppings').del()
    .then(() => {
      // Inserts seed entries
      return Promise.all(toppingsPromises)
    });

};
