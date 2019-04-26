const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('mentorprofiles', table => {
        table
            .increments();
        
        fkey(table, 'user_id', 'users');
        
        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('mentorprofiles');
