"use strict;"

exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('customers', (table)=>{
    table.increments();
    table.string('customer_email').notNullable();
    table.string('customer_password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('customers');
};
