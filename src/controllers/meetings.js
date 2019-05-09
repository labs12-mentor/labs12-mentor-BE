module.exports = {
    getMeetings,
    addMeeting,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    removeMeeting
}
const Meetings = require('../database/helpers/meetings');

async function getMeetings(req, res){
    try {
        const meetings = await Meetings.getMeetings();
        return await res.status(200).json(meetings);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMeeting(req, res){
    try {
        const meetingData = {
            match_id
        } = req.body;
        const id = await Meetings.insertMeeting(meetingData);
        return await res.status(201).json({ id, ...meetingData });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMeeting(req, res){
    try {
        const meeting = await Meetings.getMeetingById(req.params.id);
        
        if(meeting === undefined || meeting.deleted) return await res.status(404).json({ error: 'Meeting not found!' });
        return await res.status(200).json(meeting);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMeeting(req, res){
    try {
        const meeting = await Meetings.getMeetingById(req.params.id);
        const meetingData = {
            match_id
        } = req.body;
        if(meeting === undefined || meeting.deleted) return await res.status(404).json({ error: 'Meeting not found!' });
        await Meetings.updateMeeting(req.params.id, meetingData);
        return await res.status(200).json({ id: req.params.id, ...meetingData });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMeeting(req, res){
    try {
        const meeting = await Meetings.getMeetingById(req.params.id);
        if(meeting === undefined || meeting.deleted) return await res.status(404).json({ error: 'Meeting not found!' });
        await Meetings.deleteMeeting(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMeeting(req, res){
    try {
        const meeting = await Meetings.getMeetingById(req.params.id);
        if(meeting === undefined || meeting.deleted) return await res.status(404).json({ error: 'Meeting not found!' });
        await Meetings.removeMeeting(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
