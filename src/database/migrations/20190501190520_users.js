const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table
            .increments('id');
        
        table
            .string('email')
            .notNullable()
            .unique();
        
        table
            .string('password')
            .notNullable();
        
        table
            .string('first_name');
        
        table
            .string('last_name');
        
        table
            .string('street');
        
        table
            .string('city');

        table
            .string('state');
        
        table
            .string('zipcode');

        table
            .string('country');

        table
            .string('role')
            .notNullable();
        
        table
            .integer('organization_id')
            .unsigned()
            .references('id')
            .inTable('organizations')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table
            .boolean('deleted')
            .defaultTo(false)
            .notNullable();
    });
};

exports.down = dropTable('users');