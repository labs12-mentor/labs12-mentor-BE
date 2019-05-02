module.exports = {
    getOrganizations,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
}
const Organizations = require('../database/helpers/organizations');

async function getOrganizations(req, res){
    try {
        const organizations = await Organizations.getOrganizations();
        return await res.status(200).json(organizations);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getOrganization(req, res){
    try {
        const organization = await Organizations.getOrganizationById(req.params.id);
        if(organization === undefined) return await res.status(404).json({ error: 'Organization not found!' });
        return await res.status(200).json(organization);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateOrganization(req, res){
    res.status(200).json({ message: 'update organization API OK' });
}

async function deleteOrganization(req, res){
    res.status(200).json({ message: 'delete organization API OK' });
}

async function removeOrganization(req, res){
    res.status(200).json({ message: 'remove organization API OK' });
}
