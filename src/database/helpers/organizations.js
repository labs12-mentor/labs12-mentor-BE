module.exports = {
    truncate,
    getOrganizations,
    getOrganizationById,
    insertOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
};
const db = require('../dbConfig');

async function truncate() {
    return await db('organizations').truncate();
}

async function getOrganizations() {
    return await db
        .select('*')
        .from('organizations');
}

async function getOrganizationById(id) {
    return await db
        .select('id', 'name', 'logo', 'admin_id', 'deleted')
        .from('organizations')
        .where({ id })
        .first();
}

async function insertOrganization(organization) {
    return await db('organizations')
        .insert({
            name: organization.name,
            logo: organization.logo,
            admin_id: organization.admin_id
        })
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
            logo: organization.logo,
            admin_id: organization.admin_id,
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
