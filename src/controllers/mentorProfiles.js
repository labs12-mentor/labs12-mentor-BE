module.exports = {
    getMentorProfiles,
    addMentorProfile,
    getMentorProfile,
    updateMentorProfile,
    deleteMentorProfile,
    removeMentorProfile
}
const MentorProfiles = require('../database/helpers/mentorProfiles');

async function getMentorProfiles(req, res){
    const mentors = await MentorProfiles.getMentorProfiles();
    res.status(200).json(mentors);
}

async function addMentorProfile(req, res){
    res.status(200).json({ message: 'add mentor profile API OK' });
}

async function getMentorProfile(req, res){
    const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
    res.status(200).json(mentor);
}

async function updateMentorProfile(req, res){
    res.status(200).json({ message: 'update mentor profile API OK' });
}

async function deleteMentorProfile(req, res){
    res.status(200).json({ message: 'delete mentor profile API OK' });
}

async function removeMentorProfile(req, res){
    res.status(200).json({ message: 'remove mentor profile API OK' });
}
