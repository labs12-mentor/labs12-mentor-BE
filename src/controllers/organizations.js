module.exports = {
    getOrganizations,
    getOrganization,
    updateOrganization,
    deleteOrganization,
    removeOrganization
};
const Organizations = require('../database/helpers/organizations');
const Users = require('../database/helpers/users');

async function getOrganizations(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_organizations = await Organizations.getOrganizations();
        if (current_user.role !== 'ADMINISTRATOR') {
            const organizations = all_organizations.filter(
                (elem) => elem.id === current_user.organization_id
            );
            return await res.status(200).json(organizations);
        }
        return await res.status(200).json(all_organizations);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getOrganization(req, res) {
    try {
        const organization = await Organizations.getOrganizationById(req.params.id);

        if (organization === undefined || organization.deleted)
            return await res.status(404).json({ error: 'Organization not found!' });

        return await res.status(200).json(organization);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateOrganization(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const organization = await Organizations.getOrganizationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (organization === undefined)
                return await res.status(404).json({ error: 'Organization not found!' });
        } else {
            if (
                organization === undefined ||
                organization.deleted ||
                organization.id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'Organization not found!' });

            if (current_user.id !== organization.id)
                return await res.status(403).json({ error: 'Access denied!' });
        }

        const organizationData = ({ name, description, logo } = req.body);

        await Organizations.updateOrganization(req.params.id, organizationData);
        return await res.status(200).json({ id: req.params.id, ...organizationData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteOrganization(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const organization = await Organizations.getOrganizationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (organization === undefined)
                return await res.status(404).json({ error: 'Organization not found!' });
        } else {
            if (
                organization === undefined ||
                organization.deleted ||
                organization.id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'Organization not found!' });

            if (current_user.id !== organization.id)
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await Organizations.deleteOrganization(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeOrganization(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const organization = await Organizations.getOrganizationById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (organization === undefined)
                return await res.status(404).json({ error: 'Organization not found!' });
        } else {
            if (
                organization === undefined ||
                organization.deleted ||
                organization.id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'Organization not found!' });

            if (current_user.id !== organization.id)
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await Organizations.removeOrganization(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
