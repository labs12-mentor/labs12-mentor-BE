const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('menteeprofiles', table => {
        table
            .increments();
        
        fkey(table, 'user_id', 'users');

        table
            .string('desired_zip');

        table
            .integer('lambda_week')
            .notNullable();
        
        table
            .string('interests');

        table
            .string('application_answers');

        fkey(table, 'wanted_mentor_id', 'mentorprofiles');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('menteeprofiles');
