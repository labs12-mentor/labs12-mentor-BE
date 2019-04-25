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
    res.status(200).json({ message: 'get mentee profiles API OK' });
}

async function addMenteeProfile(req, res){
    res.status(200).json({ message: 'add mentee profile API OK' });
}

async function getMenteeProfile(req, res){
    res.status(200).json({ message: 'get mentee profile API OK' });
}

async function updateMenteeProfile(req, res){
    res.status(200).json({ message: 'update mentee profile API OK' });
}

async function deleteMenteeProfile(req, res){
    res.status(200).json({ message: 'delete mentee profile API OK' });
}

async function removeMenteeProfile(req, res){
    res.status(200).json({ message: 'remove mentee profile API OK' });
}
