module.exports = {
    dropTable: name => knex => knex.schema.dropTableIfExists(name),
    fkey: (table, name, ref) => {
        table
            .integer(name)
            .unsigned()
            .default(null)
            .foreign(name)
            .references('id')
            .on(ref)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    }
};
