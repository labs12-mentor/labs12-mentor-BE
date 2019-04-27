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
        .select('id', 'username', 'first_name', 'last_name', 'email', 'company_name', 'deleted')
        .from('administrators')
        .where({ id })
        .first();
}

async function insertAdministrator(administrator) {
    return await db('administrators')
        .insert({
            username: administrator.username,
            password: administrator.password,
            first_name: administrator.first_name,
            last_name: administrator.last_name,
            email: administrator.email,
            company_name: administrator.company_name
        })
        .then(response => {
            return {
                id: response[0]
            }
        });
}

async function updateAdministrator(id, administrator) {
    return await db('administrators')
        .where({ id })
        .update({
            username: administrator.username,
            password: administrator.password,
            first_name: administrator.first_name,
            last_name: administrator.last_name,
            email: administrator.email,
            company_name: administrator.company_name,
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
