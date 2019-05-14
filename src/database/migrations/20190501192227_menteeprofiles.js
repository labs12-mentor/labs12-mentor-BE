const { dropTable } = require("../helpers/db");

exports.up = function(knex, Promise) {
  return knex.schema.createTable("menteeprofiles", table => {
    table.increments("id");

    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .integer("wanted_mentor_id")
      .unsigned()
      .references("id")
      .inTable("mentorprofiles")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .boolean("deleted")
      .defaultTo(false)
      .notNullable();
  });
};

exports.down = dropTable("menteeprofiles");
