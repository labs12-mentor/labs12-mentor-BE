const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_roles', table => {
        table
            .increments();
        
        fkey(table, 'user_id', 'users');
        fkey(table, 'role_id', 'roles');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('user_roles');
