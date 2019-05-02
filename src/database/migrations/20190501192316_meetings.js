const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('meetings', table => {
        table
            .increments('id');
        table
            .string('content');
        
        table
            .integer('match_id')
            .unsigned()
            .references('id')
            .inTable('matches')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table
            .boolean('deleted')
            .defaultTo(false)
            .notNullable();
    });
};

exports.down = dropTable('meetings');