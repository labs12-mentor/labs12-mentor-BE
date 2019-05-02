module.exports = {
    getOrganizations,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
}
const Organizations = require('../database/helpers/organizations');

async function getOrganizations(req, res){
    const organizations = await Organizations.getOrganizations();
    res.status(200).json(organizations);
}

async function getOrganization(req, res){
    const organization = await Organizations.getOrganizationById(req.params.id);
    res.status(200).json(organization);
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
