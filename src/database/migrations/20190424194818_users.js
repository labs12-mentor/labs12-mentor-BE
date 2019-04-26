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
        
        table
            .integer('role_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('roles')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('users');