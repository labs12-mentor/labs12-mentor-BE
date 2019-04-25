const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('experiences', table => {
        table
            .increments();
        
        fkey(table, 'match_id', 'matches');

        table
            .string('name')
            .notNullable();
        
        fkey(table, 'user_id', 'users');

        table
            .boolean('deleted')
            .default(false);
    });
}

exports.down = dropTable('experiences');
