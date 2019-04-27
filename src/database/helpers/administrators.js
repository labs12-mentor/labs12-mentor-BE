module.exports = {
    truncate,
    getAdministrators,
    getAdministratorById,
    insertAdministrator,
    updateAdministrator,
    deleteAdministrator,
    removeAdministrator
};
const db = require('../dbConfig');

async function truncate() {
    return await db('administrators').truncate();
}

async function getAdministrators() {
    return await db
        .select('*')
        .from('administrators');
}

async function getAdministratorById(id) {
    return await db
        .select('id', 'username', 'deleted')
        .from('administrators')
        .where({ id })
        .first();
}

async function insertAdministrator(administrator) {
    return await db('administrators')
        .insert({
            user_id: administrator.user_id,
            name: administrator.name,
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateAdministrator(id, administrator) {
    return await db('administrators')
        .where({ id })
        .update({
            user_id: administrator.user_id,
            name: administrator.name,
            deleted: administrator.deleted
        });
}

async function deleteAdministrator(id) {
    return await db('administrators')
        .where({ id })
        .update({ deleted: true });
}

async function removeAdministrator(id) {
    return await db('administrators')
        .where({ id })
        .del();
}
