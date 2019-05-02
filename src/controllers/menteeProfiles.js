module.exports = {
    getMenteeProfiles,
    addMenteeProfile,
    getMenteeProfile,
    updateMenteeProfile,
    deleteMenteeProfile,
    removeMenteeProfile
}
const MenteeProfiles = require('../database/helpers/menteeProfiles');

async function getMenteeProfiles(req, res){
    try {
        const mentees = await MenteeProfiles.getMenteeProfiles();

        return await res.status(200).json(mentees);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMenteeProfile(req, res){
    try {
        const menteeData = {
            user_id,
            wanted_mentor_id
        } = req.body;
        const mentee = await MenteeProfiles.getMenteeProfileByUserId(menteeData.user_id);
        if(mentee !== undefined) return await res.status(404).json({ error: 'Mentee profile already exist!' });
        MenteeProfiles.insertMenteeProfile(menteeData);
        return await res.status(200).json({ message: 'Successfully added a mentee!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMenteeProfile(req, res){
    try {
        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if(mentor === undefined || mentor.deleted) return await res.status(404).json({ error: 'Mentee not found!' });
        return await res.status(200).json(mentee);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMenteeProfile(req, res){
    try {
        const menteeData = {
            user_id,
            wanted_mentor_id
        } = req.body;
        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if(mentee === undefined || mentee.deleted) return await res.status(404).json({ error: 'Mentee not found!' });
        MenteeProfiles.updateMenteeProfile(req.params.id, menteeData);
        return await res.status(200).json({ message: 'Successfully updated a mentee!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMenteeProfile(req, res){
    try {
        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if(mentee === undefined || mentee.deleted) return await res.status(404).json({ error: 'Mentee not found!' });
        MenteeProfiles.deleteMenteeProfile(req.params.id);
        return await res.status(200).json({ message: 'Successfully deleted a mentee!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMenteeProfile(req, res){
    try {
        const mentee = await MenteeProfiles.getMenteeProfileById(req.params.id);
        if(mentee === undefined || mentee.deleted) return await res.status(404).json({ error: 'Mentee not found!' });
        MenteeProfiles.removeMenteeProfile(req.params.id);
        return await res.status(200).json({ message: 'Successfully removed a mentee!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
