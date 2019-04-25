const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('mentorprofiles', table => {
        table
            .increments();
        
        fkey(table, 'user_id', 'users');

        fkey(table, 'experience', 'experiences');
        
        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('mentorprofiles');
