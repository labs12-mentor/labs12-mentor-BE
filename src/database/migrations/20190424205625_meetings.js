const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('meetings', table => {
        table
            .increments();
        
        fkey(table, 'match_id', 'matches');

        table
            .date('meeting_date')
            .notNullable();
        
        table
            .string('location')
            .notNullable();

        table
            .string('notes');

        table
            .integer('rating');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('meetings');
