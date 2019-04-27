module.exports = {
    truncate,
    getOwners,
    getOwnerById,
    insertOwner,
    updateOwner,
    deleteOwner,
    removeOwner
};
const db = require('../dbConfig');

async function truncate() {
    return await db('owners').truncate();
}

async function getOwners() {
    return await db
        .select('*')
        .from('owners');
}

async function getOwnerById(id) {
    return await db
        .select('id', 'username', 'deleted')
        .from('owners')
        .where({ id })
        .first();
}

async function insertOwner(owner) {
    return await db('owners')
        .insert({
            user_id: owner.user_id,
            name: owner.name,
        })
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateOwner(id, owner) {
    return await db('owners')
        .where({ id })
        .update({
            user_id: owner.user_id,
            name: owner.name,
            deleted: owner.deleted
        });
}

async function deleteOwner(id) {
    return await db('owners')
        .where({ id })
        .update({ deleted: true });
}

async function removeOwner(id) {
    return await db('owners')
        .where({ id })
        .del();
}
