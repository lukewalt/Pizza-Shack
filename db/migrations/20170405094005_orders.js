"use strict;"

exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('orders', (table)=>{
    table.increments();
    table.string('order_name').notNullable();
    table.string('order_email').notNullable();
    table.string('order_phone').notNullable();
    table.integer('order_size_id').notNullable();
    table.specificType('order_toppings', knex.raw('text[]')).notNullable().defaultTo('{"cheese"}');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('orders');
};
