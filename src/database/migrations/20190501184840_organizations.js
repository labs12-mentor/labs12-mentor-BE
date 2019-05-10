const { dropTable } = require("../helpers/db");

exports.up = function(knex, Promise) {
  return knex.schema.createTable("organizations", table => {
    table.increments("id");

    table
      .string("name")
      .notNullable()
      .unique();

    table.string("description");

    table.string("logo");

    table
      .boolean("deleted")
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = dropTable("organizations");
