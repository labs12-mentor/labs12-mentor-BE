const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('matches', table => {
        table
            .increments();
        
        fkey(table, 'mentor_id', 'mentorprofiles');
        fkey(table, 'mentee_id', 'menteeprofiles');

        table
            .double('match_score');

        table
            .integer('status')
            .notNullable();

        table
            .date('start_date')
            .notNullable();
        
        table
            .date('end_date')
            .notNullable();

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('matches');
