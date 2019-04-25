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
    res.status(200).json({ message: 'get mentor profiles API OK' });
}

async function addMentorProfile(req, res){
    res.status(200).json({ message: 'add mentor profile API OK' });
}

async function getMentorProfile(req, res){
    res.status(200).json({ message: 'get mentor profile API OK' });
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
