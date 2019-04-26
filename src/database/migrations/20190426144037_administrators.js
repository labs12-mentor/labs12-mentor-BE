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
            .string('country');
        
        table
            .string('state');
        
        table
            .string('city');
        
        table
            .string('zipcode');

        table
            .string('company_name');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('administrators');