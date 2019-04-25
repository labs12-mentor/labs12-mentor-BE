const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('organizations', table => {
        table
            .increments();
        
        table
            .string('name')
            .notNullable()
            .unique();

        table
            .string('logo');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('organizations');
