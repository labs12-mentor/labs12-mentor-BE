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
    res.status(200).json({ message: 'get meetings API OK' });
}

async function addMeeting(req, res){
    res.status(200).json({ message: 'add meeting API OK' });
}

async function getMeeting(req, res){
    res.status(200).json({ message: 'get meeting API OK' });
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
