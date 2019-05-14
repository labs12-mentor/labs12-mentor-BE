module.exports = {
    getMentorProfiles,
    addMentorProfile,
    getMentorProfile,
    updateMentorProfile,
    deleteMentorProfile,
    removeMentorProfile
}
const MentorProfiles = require('../database/helpers/mentorProfiles');
const Users = require('../database/helpers/users');

async function getMentorProfiles(req, res){
    try {
        // const user = await Users.getUserById(req.user.id);
        
        // if(user === undefined){
        //     return await res.status(403).json({ error: 'You are not authenticated!' });
        // }

        // let mentors = [];
        // if(user.role !== 'ADMINISTRATOR'){
        //     mentors = await MentorProfiles.getMentorProfilesByOrganization(user.organization_id);
        // }else{
        const mentors = await MentorProfiles.getMentorProfiles();
        // }

        // if(mentors === undefined){
        //     mentors = [];
        // }

        return await res.status(200).json(mentors);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMentorProfile(req, res){
    try {
        const mentorProfile = { user_id } = req.body;
        const mentor = await MentorProfiles.getMentorProfileByUserId(mentorProfile.user_id);
        
        if(mentor !== undefined) return await res.status(404).json({ error: 'Mentor already exists!' });

        const id = await MentorProfiles.insertMentorProfile(mentorProfile);
        return await res.status(201).json({ id, ...mentorProfile });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMentorProfile(req, res){
    try {
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if(mentor === undefined || mentor.deleted) return await res.status(404).json({ error: 'Mentor not found!' });
        return await res.status(200).json(mentor);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMentorProfile(req, res){
    try {
        const mentorProfile = { user_id } = req.body;
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if(mentor === undefined || mentor.deleted) return await res.status(404).json({ error: 'Mentor not found!' });
        await MentorProfiles.updateMentorProfile(req.params.id, mentorProfile);
        return await res.status(200).json({ id: req.params.id, ...mentorProfile });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMentorProfile(req, res){
    try {
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if(mentor === undefined || mentor.deleted) return await res.status(404).json({ error: 'Mentor not found!' });
        await MentorProfiles.deleteMentorProfile(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMentorProfile(req, res){
    try {
        const mentor = await MentorProfiles.getMentorProfileById(req.params.id);
        if(mentor === undefined) return await res.status(404).json({ error: 'Mentor not found!' });
        await MentorProfiles.removeMentorProfile(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
