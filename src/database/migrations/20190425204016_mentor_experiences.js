const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('mentor_experiences', table => {
        table
            .increments();
        
        fkey(table, 'mentor_id', 'mentorprofiles');
        fkey(table, 'experience_id', 'experiences');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('mentor_experiences');
