const { dropTable } = require("../helpers/db");

exports.up = function(knex, Promise) {
  return knex.schema.createTable("mentorprofiles", table => {
    table.increments("id");

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .boolean("deleted")
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = dropTable("mentorprofiles");
