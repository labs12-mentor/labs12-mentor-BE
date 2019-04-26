const { dropTable, fkey } = require('../helpers/db');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('mentee_experiences', table => {
        table
            .increments();
        
        fkey(table, 'mentee_id', 'menteeprofiles');
        fkey(table, 'experience_id', 'experiences');

        table
            .boolean('deleted')
            .default(false);
    });
};

exports.down = dropTable('mentee_experiences');
