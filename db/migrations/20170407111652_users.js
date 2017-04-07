
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', (table) => {
    table.increments(); // same as (`id` int unsigned not null auto_increment primary key)
    table.string('email').notNullable();
    table.string('password').notNullable();
  });
}

exports.down = (knex, Promise) => knex.schema.dropTable('users')
