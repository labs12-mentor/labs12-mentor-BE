const { dropTable } = require("../helpers/db");

exports.up = function(knex, Promise) {
  return knex.schema.createTable("invitations", table => {
    table.increments("id");

    table
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .string("role")
      .defaultTo("USER")
      .notNullable();

    table
      .boolean("deleted")
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = dropTable("invitations");
