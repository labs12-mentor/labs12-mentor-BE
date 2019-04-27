module.exports = {
    truncate,
    getAllRoles,
    getRoleById,
    insertRole,
    updateRole,
    deleteRole,
    removeRole
};
const db = require('../dbConfig');

async function truncate() {
    return await db('roles').truncate();
}

async function getAllRoles() {
    return await db
        .select('*')
        .from('roles');
}

async function getRoleById(id) {
    return await db
        .select('id', 'name', 'deleted')
        .from('roles')
        .where({ id })
        .first();
}

async function insertRole(role) {
    return await db('roles')
        .insert({ name: role.name })
        .then(response => {
            return {
                id: response[0]
            }
        });
}

async function updateRole(id, role) {
    return await db('roles')
        .where({ id })
        .update({ name: role.name, deleted: role.deleted });
}

async function deleteRole(id) {
    return await db('roles')
        .where({ id })
        .update({ deleted: true });
}

async function removeRole(id) {
    return await db('roles')
        .where({ id })
        .del();
}
