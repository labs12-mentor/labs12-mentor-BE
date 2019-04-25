const { dropTable } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('notifications', table => {
        table
            .increments();
        
        fkey(table, 'user_id', 'users');

        table
            .string('content')
            .notNullable();

        table
            .boolean('watched')
            .default(false);

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('notifications');
