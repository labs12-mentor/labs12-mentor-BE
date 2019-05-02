const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('notifications', table => {
        table
            .increments('id');
            
        table
            .string('content')
            .notNullable();
        
        table
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table
            .boolean('watched')
            .defaultTo(false)
            .notNullable();
        
        table
            .boolean('deleted')
            .defaultTo(false)
            .notNullable();
    });
};

exports.down = dropTable('notifications');