const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('mentors_mentees', table => {
        table
            .increments();
        
        fkey(table, 'wanted_mentor_id', 'mentorprofiles');
        fkey(table, 'mentee_id', 'menteeprofiles');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('mentors_mentees');
