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
    const meetings = await Meetings.getMeetings();
    res.status(200).json(meetings);
}

async function addMeeting(req, res){
    res.status(200).json({ message: 'add meeting API OK' });
}

async function getMeeting(req, res){
    const meeting = await Meetings.getMeetingById(req.params.id);
    res.status(200).json(meeting);
}

async function updateMeeting(req, res){
    res.status(200).json({ message: 'update meeting API OK' });
}

async function deleteMeeting(req, res){
    res.status(200).json({ message: 'delete meeting API OK' });
}

async function removeMeeting(req, res){
    res.status(200).json({ message: 'remove meeting API OK' });
}
