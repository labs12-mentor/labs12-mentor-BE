module.exports = {
    truncate,
    getOrganizations,
    getOrganizationById,
    getOrganizationByName,
    insertOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
};
const db = require('../dbConfig');

async function truncate() {
    await db('administrators').del();
    await db.raw('ALTER SEQUENCE administrators_id_seq RESTART WITH 1');
    return;
}

async function getOrganizations() {
    return await db
        .select('*')
        .from('organizations');
}

async function getOrganizationById(id) {
    return await db
        .select('id', 'name', 'description', 'logo')
        .from('organizations')
        .where({ id })
        .first();
}

async function getOrganizationByName(name) {
    return await db
        .select('id', 'name', 'description', 'logo')
        .from('organizations')
        .where({ name })
        .first();
}

async function insertOrganization(organization) {
    return await db('organizations')
        .insert({
            name: organization.name,
            description: organization.description,
            logo: organization.logo
        })
        .returning('id')
        .then(response => {
            return {
                id: response[0]
            }
        })
}

async function updateOrganization(id, organization) {
    return await db('organizations')
        .where({ id })
        .update({
            name: organization.name,
            description: organization.description,
            logo: organization.logo,
            deleted: organization.deleted
        });
}

async function deleteOrganization(id) {
    return await db('organizations')
        .where({ id })
        .update({ deleted: true });
}

async function removeOrganization(id) {
    return await db('organizations')
        .where({ id })
        .del();
}
