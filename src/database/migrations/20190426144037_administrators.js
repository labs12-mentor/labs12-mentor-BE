const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('administrators', table => {
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
            .string('first_name')
            .notNullable();
        
        table
            .string('last_name')
            .notNullable();
        
        table
            .string('email')
            .notNullable();

        table
            .string('company_name')
            .notNullable();

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('administrators');