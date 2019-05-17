module.exports = {
    getExperiences,
    addExperience,
    getExperience,
    updateExperience,
    deleteExperience,
    removeExperience
};
const Experiences = require('../database/helpers/experiences');
const Users = require('../database/helpers/users');

async function getExperiences(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_experiences = await Experiences.getExperiences();
        const all_users = await Users.getAllUsers();

        if (current_user.role !== 'ADMINISTRATOR') {
            const experiences = all_experiences.filter((elem) => {
                const user = all_users.find((user) => elem.user_id === user.id);
                return current_user.organization_id === user.organization_id;
            });
            return await res.status(200).json(experiences);
        }
        return await res.status(200).json(all_experiences);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addExperience(req, res) {
    try {
        const experienceData = ({ name, user_id } = req.body);
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined || current_user.id !== experienceData.user_id)
            return await res.status(403).json({ error: 'Access denied!' });

        const experienceId = await Experiences.insertExperience(experienceData);
        return await res.status(201).json({ id: experienceId, ...experienceData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getExperience(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const experience = await Experiences.getExperienceById(req.params.id);
        const all_users = await Users.getAllUsers();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (experience === undefined)
                return await res.status(404).json({ error: 'Experience not found!' });
        } else {
            if (experience === undefined || experience.deleted)
                return await res.status(404).json({ error: 'Experience not found!' });

            const user = all_users.find((elem) => elem.id === experience.user_id);

            if (current_user.organization_id !== user.organization_id)
                return await res.status(403).json({ error: 'Access denied!' });
        }
        return await res.status(200).json(experience);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateExperience(req, res) {
    try {
        const experienceData = ({ name, user_id } = req.body);
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const experience = await Experiences.getExperienceById(req.params.id);
        const all_users = await Users.getAllUsers();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (experience === undefined)
                return await res.status(404).json({ error: 'Experience not found!' });
        } else {
            if (experience === undefined || experience.deleted)
                return await res.status(404).json({ error: 'Experience not found!' });

            const user = all_users.find((elem) => elem.id === experience.user_id);

            if (current_user.organization_id !== user.organization_id)
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Experiences.updateExperience(req.params.id, experienceData);
        const exp = await Experiences.getExperienceById(req.params.id);
        return await res.status(200).json({ ...exp });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteExperience(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const experience = await Experiences.getExperienceById(req.params.id);
        const all_users = await Users.getAllUsers();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (experience === undefined)
                return await res.status(404).json({ error: 'Experience not found!' });
        } else {
            if (experience === undefined || experience.deleted)
                return await res.status(404).json({ error: 'Experience not found!' });

            const user = all_users.find((elem) => elem.id === experience.user_id);

            if (current_user.organization_id !== user.organization_id)
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Experiences.deleteExperience(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeExperience(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const experience = await Experiences.getExperienceById(req.params.id);
        const all_users = await Users.getAllUsers();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (experience === undefined)
                return await res.status(404).json({ error: 'Experience not found!' });
        } else {
            if (experience === undefined || experience.deleted)
                return await res.status(404).json({ error: 'Experience not found!' });

            const user = all_users.find((elem) => elem.id === experience.user_id);

            if (current_user.organization_id !== user.organization_id)
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Experiences.removeExperience(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
