"use strict;"

exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', table => {
    table.increments(); // primary key not nullable autoincrements
    table.string('name').notNullable().unique();
    table.string('email').notNullable()
    table.string('phone').notNullable()
    table.string('message').notNullable()
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts')
};
