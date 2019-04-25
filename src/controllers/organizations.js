module.exports = {
    getOrganizations,
    addOrganization,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
}
const Organizations = require('../database/helpers/organizations');

async function getOrganizations(req, res){
    res.status(200).json({ message: 'get organizations API OK' });
}

async function addOrganization(req, res){
    res.status(200).json({ message: 'add organization API OK' });
}

async function getOrganization(req, res){
    res.status(200).json({ message: 'get organization API OK' });
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
