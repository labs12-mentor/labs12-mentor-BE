module.exports = {
    getMenteeProfiles,
    addMenteeProfile,
    getMenteeProfile,
    updateMenteeProfile,
    deleteMenteeProfile,
    removeMenteeProfile
};
const MenteeProfiles = require('../database/helpers/menteeProfiles');
const Users = require('../database/helpers/users');

async function getMenteeProfiles(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_mentees = await MenteeProfiles.getMenteeProfiles();
        const all_users = await Users.getAllUsers();

        if (current_user.role !== 'ADMINISTRATOR') {
            const mentees = all_mentees.filter((elem) => {
                const user = all_users.find((user) => user.id === elem.user_id);
                return user.organization_id === current_user.organization_id;
            });
            return await res.status(200).json(mentees);
        }
        return await res.status(200).json(all_mentees);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMenteeProfile(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const menteeProfile = ({ user_id, wanted_mentor_id, status } = req.body);
        const mentee = await MenteeProfiles.getMenteeProfileByUserId(menteeProfile.user_id);

        if (mentee !== undefined)
            return await res.status(404).json({ error: 'Mentee profile already exists!' });

        const id = await MenteeProfiles.insertMenteeProfile(menteeProfile);
        return await res.status(201).json({ id, ...mentee, ...menteeProfile });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMenteeProfile(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_users = await Users.getAllUsers();

        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (mentee === undefined)
                return await res.status(404).json({ error: 'Mentee not found!' });
        } else {
            if (mentee === undefined || mentee.deleted)
                return await res.status(404).json({ error: 'Mentee not found!' });

            const user = all_users.find((elem) => elem.id === mentee.user_id);
            if (current_user.organization_id !== user.organization_id)
                return await res.status(403).json({ error: 'Access denied!' });
        }
        return await res.status(200).json(mentee);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMenteeProfile(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_users = await Users.getAllUsers();

        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (mentee === undefined)
                return await res.status(404).json({ error: 'Mentee not found!' });
        } else {
            if (mentee === undefined || mentee.deleted)
                return await res.status(404).json({ error: 'Mentee not found!' });

            const user = all_users.find((elem) => elem.id === mentee.user_id);
            if (
                current_user.organization_id !== user.organization_id ||
                current_user.id !== mentee.user_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }

        const menteeData = ({ user_id, wanted_mentor_id, status } = req.body);

        const user = await Users.getUserById(menteeData.user_id);
        if (user.role !== 'MENTEE' && menteeData.status === 'APPROVED') {
            await Users.updateUser(menteeData.user_id, {
                role: 'MENTEE'
            });
        }

        await MenteeProfiles.updateMenteeProfile(req.params.id, menteeData);
        return await res.status(200).json({ id: req.params.id, ...mentee, ...menteeData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMenteeProfile(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_users = await Users.getAllUsers();

        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (mentee === undefined)
                return await res.status(404).json({ error: 'Mentee not found!' });
        } else {
            if (mentee === undefined || mentee.deleted)
                return await res.status(404).json({ error: 'Mentee not found!' });

            const user = all_users.find((elem) => elem.id === mentee.user_id);
            if (
                current_user.organization_id !== user.organization_id ||
                current_user.id !== mentee.user_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await MenteeProfiles.deleteMenteeProfile(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMenteeProfile(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_users = await Users.getAllUsers();

        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (mentee === undefined)
                return await res.status(404).json({ error: 'Mentee not found!' });
        } else {
            if (mentee === undefined || mentee.deleted)
                return await res.status(404).json({ error: 'Mentee not found!' });

            const user = all_users.find((elem) => elem.id === mentee.user_id);
            if (
                current_user.organization_id !== user.organization_id ||
                current_user.id !== mentee.user_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }

        await MenteeProfiles.removeMenteeProfile(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
