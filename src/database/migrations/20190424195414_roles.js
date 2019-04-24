const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('roles', table => {
        table
            .increments();
        
        table
            .string('name')
            .notNullable()
            .unique();

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('roles');