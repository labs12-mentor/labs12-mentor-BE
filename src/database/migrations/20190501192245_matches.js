const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('matches', table => {
        table
            .increments('id');
        table
            .string('status')
            .notNullable();

        table
            .integer('mentor_id')
            .unsigned()
            .references('id')
            .inTable('mentorprofiles')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table
            .integer('mentee_id')
            .unsigned()
            .references('id')
            .inTable('menteeprofiles')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table
            .boolean('deleted')
            .defaultTo(false)
            .notNullable();
    });
};

exports.down = dropTable('matches');