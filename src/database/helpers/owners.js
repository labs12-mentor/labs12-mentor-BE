module.exports = {
    truncate,
    getOwners,
    getOwnerById,
    getOwnerByUsername,
    insertOwner,
    updateOwner,
    deleteOwner,
    removeOwner,
    checkIfCanRegister
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
        .select('id', 'username', 'email', 'company_name', 'deleted')
        .from('owners')
        .where({ id })
        .first();
}

async function getOwnerByUsername(username) {
    return await db
        .select('*')
        .from('owners')
        .where({ username })
        .first();
}

async function insertOwner(owner) {
    return await db('owners')
        .insert({
            username: owner.username,
            password: owner.password,
            email: owner.email,
            company_name: owner.company_name
        })
        .then(response => {
            return {
                id: response[0]
            }
        });
}

async function updateOwner(id, owner) {
    return await db('owners')
        .where({ id })
        .update({
            username: owner.username,
            password: owner.password,
            email: owner.email,
            company_name: owner.company_name,
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

async function checkIfCanRegister() {
    return await db
        .select('*')
        .from('owners')
        .where({ deleted: false })
        .count('id')
        .first()
        .then(result => {
            return result['count(`id`)'] === 0;
        });
}