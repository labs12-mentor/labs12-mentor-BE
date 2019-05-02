module.exports = {
    getOrganizations,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
}
const Organizations = require('../database/helpers/organizations');
const Users = require('../database/helpers/users');

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
        const user = await Users.getUserById(req.user.id);

        if(user === undefined){
            return await res.status(403).json({ error: 'You are not authenticated!' });
        }

        if(user.role !== 'ADMINISTRATOR' && user.organization_id !== req.params.id){
            return await res.status(403).json({ error: 'This organization is not yours!' });
        }

        const organization = await Organizations.getOrganizationById(req.params.id);
        
        if(organization === undefined || organization.deleted) return await res.status(404).json({ error: 'Organization not found!' });
        return await res.status(200).json(organization);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateOrganization(req, res){
    try {
        const user = await Users.getUserById(req.user.id);

        if(user === undefined){
            return await res.status(403).json({ error: 'You are not authenticated!' });
        }

        if(user.role !== 'ADMINISTRATOR' && user.organization_id !== req.params.id){
            return await res.status(403).json({ error: 'This organization is not yours!' });
        }
        const organizationData = {
            name,
            description,
            logo
        } = req.body;
        
        const organization = await Organizations.getOrganizationById(req.params.id);
        if(organization === undefined || organization.deleted) return await res.status(404).json({ error: 'Organization not found!' });
        await Organizations.updateOrganization(req.params.id, organizationData);
        return await res.status(200).json({ message: 'Organization successfully updated!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteOrganization(req, res){
    try {
        const user = await Users.getUserById(req.user.id);

        if(user === undefined){
            return await res.status(403).json({ error: 'You are not authenticated!' });
        }

        if(user.role !== 'ADMINISTRATOR' && user.organization_id !== req.params.id){
            return await res.status(403).json({ error: 'This organization is not yours!' });
        }
        const organization = await Organizations.getOrganizationById(req.params.id);
        if(organization === undefined || organization.deleted) return await res.status(404).json({ error: 'Organization not found!' });
        await Organizations.deleteOrganization(req.params.id);
        return await res.status(200).json({ message: 'Organization successfully deleted!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeOrganization(req, res){
    try {
        const organization = await Organizations.getOrganizationById(req.params.id);
        if(organization === undefined) return await res.status(404).json({ error: 'Organization not found!' });
        await Organizations.removeOrganization(req.params.id);
        return await res.status(200).json({ message: 'Organization successfully removed!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
