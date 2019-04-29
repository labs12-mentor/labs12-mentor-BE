const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('owners', table => {
        table
            .increments();
        
        table
            .string('username')
            .notNullable()
            .unique();
        
        table
            .string('password')
            .notNullable();
        
        table
            .string('email')
            .notNullable();

        table
            .string('company_name');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('owners');