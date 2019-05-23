module.exports = {
    getAllUsers,
    getCurrentUser,
    getUser,
    updateUser,
    deleteUser,
    removeUser
};
const Users = require('../database/helpers/users');

async function getAllUsers(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_users = await Users.getAllUsers();

        if (current_user.role !== 'ADMINISTRATOR') {
            const users = all_users.filter(
                (elem) => elem.organization_id === current_user.organization_id
            );
            return await res.status(200).json(users);
        }

        return await res.status(200).json(all_users);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getCurrentUser(req, res) {
    try {
        const user = await Users.getUserById(req.user.id);

        if (user === undefined || user.deleted)
            return await res.status(404).json({ error: 'User not found!' });

        return await res.status(200).json(user);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const user = await Users.getUserById(req.params.id);

        if (current_user.role === 'ADMINISTRATOR') {
            if (user === undefined) return await res.status(404).json({ error: 'User not found!' });
        } else {
            if (
                user === undefined ||
                user.deleted ||
                user.organization_id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'User not found!' });
        }

        return await res.status(200).json(user);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const user = await Users.getUserById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (user === undefined) return await res.status(404).json({ error: 'User not found!' });
        } else {
            if (
                user === undefined ||
                user.deleted ||
                user.organization_id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'User not found!' });

            if (current_user.id !== user.id)
                return await res.status(403).json({ error: 'Access denied!' });
        }

        const updatedUser = {
            ...user,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
            avatar_url: req.body.avatar_url,
            role: req.body.role
        };

        await Users.updateUser(req.params.id, updatedUser);

        return await res.status(200).json(updatedUser);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const user = await Users.getUserById(req.params.id);

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (user === undefined) return await res.status(404).json({ error: 'User not found!' });
        } else {
            if (
                user === undefined ||
                user.deleted ||
                user.organization_id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'User not found!' });

            if (current_user.id !== user.id)
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await Users.deleteUser(req.params.id);

        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeUser(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const user = await Users.getUserById(req.params.id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (user === undefined) return await res.status(404).json({ error: 'User not found!' });
        } else {
            if (
                user === undefined ||
                user.deleted ||
                user.organization_id !== current_user.organization_id
            )
                return await res.status(404).json({ error: 'User not found!' });

            if (current_user.id !== user.id)
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Users.removeUser(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
