const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
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
        
        fkey(table, 'role_id', 'roles');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('users');