module.exports = {
    getMentorProfiles,
    addMentorProfile,
    getMentorProfile,
    updateMentorProfile,
    deleteMentorProfile,
    removeMentorProfile
};
const MentorProfiles = require('../database/helpers/mentorProfiles');
const Users = require('../database/helpers/users');

async function getMentorProfiles(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_mentors = await MentorProfiles.getMentorProfiles();
        const all_users = await Users.getAllUsers();

        if (current_user.role !== 'ADMINISTRATOR') {
            const mentors = all_mentors.filter((elem) => {
                const user = all_users.find((user) => user.id === elem.user_id);
                return user.id === current_user.organization_id;
            });
            return await res.status(200).json(mentors);
        }
        return await res.status(200).json(all_mentors);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMentorProfile(req, res) {
    try {
        const mentorProfile = ({ user_id, status } = req.body);
        const mentor = await MentorProfiles.getMentorProfileByUserId(mentorProfile.user_id);

        if (mentor !== undefined)
            return await res.status(404).json({ error: 'Mentor already exists!' });

        const id = await MentorProfiles.insertMentorProfile(mentorProfile);
        return await res.status(201).json({ id, ...mentorProfile });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMentorProfile(req, res) {
    try {
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if (mentor === undefined || mentor.deleted)
            return await res.status(404).json({ error: 'Mentor not found!' });
        return await res.status(200).json(mentor);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMentorProfile(req, res) {
    try {
        const mentorProfile = ({ user_id, status } = req.body);
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);

        const user = await Users.getUserById(mentorProfile.user_id);
        if (user.role !== 'MENTOR' && mentorProfile.status === 'APPROVED') {
            await Users.updateUser(mentorProfile.user_id, {
                role: 'MENTOR'
            });
        }

        if (mentor === undefined || mentor.deleted)
            return await res.status(404).json({ error: 'Mentor not found!' });
        await MentorProfiles.updateMentorProfile(req.params.id, mentorProfile);
        return await res.status(200).json({ id: req.params.id, ...mentor, ...mentorProfile });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMentorProfile(req, res) {
    try {
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if (mentor === undefined || mentor.deleted)
            return await res.status(404).json({ error: 'Mentor not found!' });
        await MentorProfiles.deleteMentorProfile(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMentorProfile(req, res) {
    try {
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if (mentor === undefined) return await res.status(404).json({ error: 'Mentor not found!' });
        await MentorProfiles.removeMentorProfile(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
