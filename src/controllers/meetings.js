module.exports = {
    getMeetings,
    addMeeting,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    removeMeeting
};
const Meetings = require('../database/helpers/meetings');
const Matches = require('../database/helpers/matches');
const Mentors = require('../database/helpers/mentorProfiles');
const Mentees = require('../database/helpers/menteeProfiles');
const Users = require('../database/helpers/users');

async function getMeetings(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });
        const all_meetings = await Meetings.getMeetings();
        const all_matches = await Matches.getMatches();
        const all_users = await Users.getAllUsers();
        const all_mentors = await Mentors.getMentorProfiles();
        const all_mentees = await Mentees.getMenteeProfiles();

        if (current_user.role !== 'ADMINISTRATOR') {
            const meetings = all_meetings.filter((meeting) => {
                const match = all_matches.find((elem) => elem.id === meeting.match_id);
                const mentor = all_mentors.find((user) => match.mentor_id === user.id);
                const mentee = all_mentees.find((user) => match.mentee_id === user.id);
                const mentor_user = all_users.find((user) => mentor.user_id === user.id);
                const mentee_user = all_mentors.find((user) => mentee.user_id === user.id);

                return (
                    current_user.organization_id === mentor_user.organization_id &&
                    current_user.organization_id === mentee_user.organization_id
                );
            });
            return await res.status(200).json(meetings);
        }
        return await res.status(200).json(all_meetings);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMeeting(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const meetingData = ({ match_id } = req.body);
        const all_matches = await Matches.getMatches();
        const all_users = await Users.getAllUsers();
        const all_mentors = await Mentors.getMentorProfiles();
        const all_mentees = await Mentees.getMenteeProfiles();
        const match = await all_matches.find((elem) => Number(meetingData.match_id) === elem.id);
        const mentor = await all_mentors.find((user) => match.mentor_id === user.id);
        const mentee = await all_mentees.find((user) => match.mentee_id === user.id);
        const mentor_user = await all_users.find((user) => mentor.user_id === user.id);
        const mentee_user = await all_users.find((user) => mentee.user_id === user.id);
        if (
            current_user.organization_id !== mentor_user.organization_id &&
            current_user.organization_id !== mentee_user.organization_id &&
            current_user.role !== 'ADMINISTRATOR' &&
            current_user.role !== 'OWNER' &&
            current_user.role !== 'MANAGER'
        )
            return await res.status(403).json({ error: 'Access denied!' });
        const id = await Meetings.insertMeeting(meetingData);
        return await res.status(201).json({ id, ...meetingData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMeeting(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const meeting = await Meetings.getMeetingById(req.params.id);
        const all_matches = await Matches.getMatches();
        const all_users = await Users.getAllUsers();
        const all_mentors = await Mentors.getMentorProfiles();
        const all_mentees = await Mentees.getMenteeProfiles();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (meeting === undefined)
                return await res.status(404).json({ error: 'Meeting not found!' });
        } else {
            if (meeting === undefined || meeting.deleted)
                return await res.status(404).json({ error: 'Meeting not found!' });

            const match = all_matches.find((elem) => meeting.match_id === elem.id);
            const mentor = all_mentors.find((user) => match.mentor_id === user.id);
            const mentee = all_mentees.find((user) => match.mentee_id === user.id);
            const mentor_user = all_users.find((user) => mentor.user_id === user.id);
            const mentee_user = all_mentors.find((user) => mentee.user_id === user.id);

            if (
                current_user.organization_id !== mentor_user.organization_id ||
                current_user.organization_id !== mentee_user.organization_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }
        return await res.status(200).json(meeting);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMeeting(req, res) {
    try {
        const meetingData = ({ match_id } = req.body);
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const meeting = await Meetings.getMeetingById(req.params.id);
        const all_matches = await Matches.getMatches();
        const all_users = await Users.getAllUsers();
        const all_mentors = await Mentors.getMentorProfiles();
        const all_mentees = await Mentees.getMenteeProfiles();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (meeting === undefined)
                return await res.status(404).json({ error: 'Meeting not found!' });
        } else {
            if (meeting === undefined || meeting.deleted)
                return await res.status(404).json({ error: 'Meeting not found!' });

            const match = all_matches.find((elem) => meeting.match_id === elem.id);
            const mentor = all_mentors.find((user) => match.mentor_id === user.id);
            const mentee = all_mentees.find((user) => match.mentee_id === user.id);
            const mentor_user = all_users.find((user) => mentor.user_id === user.id);
            const mentee_user = all_mentors.find((user) => mentee.user_id === user.id);

            if (
                current_user.organization_id !== mentor_user.organization_id ||
                current_user.organization_id !== mentee_user.organization_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Meetings.updateMeeting(req.params.id, meetingData);
        return await res.status(200).json({ id: req.params.id, ...meetingData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMeeting(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const meeting = await Meetings.getMeetingById(req.params.id);
        const all_matches = await Matches.getMatches();
        const all_users = await Users.getAllUsers();
        const all_mentors = await Mentors.getMentorProfiles();
        const all_mentees = await Mentees.getMenteeProfiles();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (meeting === undefined)
                return await res.status(404).json({ error: 'Meeting not found!' });
        } else {
            if (meeting === undefined || meeting.deleted)
                return await res.status(404).json({ error: 'Meeting not found!' });

            const match = all_matches.find((elem) => meeting.match_id === elem.id);
            const mentor = all_mentors.find((user) => match.mentor_id === user.id);
            const mentee = all_mentees.find((user) => match.mentee_id === user.id);
            const mentor_user = all_users.find((user) => mentor.user_id === user.id);
            const mentee_user = all_mentors.find((user) => mentee.user_id === user.id);

            if (
                current_user.organization_id !== mentor_user.organization_id ||
                current_user.organization_id !== mentee_user.organization_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Meetings.deleteMeeting(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMeeting(req, res) {
    try {
        const current_user = await Users.getUserById(req.user.id);
        if (current_user === undefined)
            return await res.status(403).json({ error: 'Access denied!' });

        const meeting = await Meetings.getMeetingById(req.params.id);
        const all_matches = await Matches.getMatches();
        const all_users = await Users.getAllUsers();
        const all_mentors = await Mentors.getMentorProfiles();
        const all_mentees = await Mentees.getMenteeProfiles();

        if (
            current_user.role === 'ADMINISTRATOR' ||
            current_user.role === 'OWNER' ||
            current_user.role === 'MANAGER'
        ) {
            if (meeting === undefined)
                return await res.status(404).json({ error: 'Meeting not found!' });
        } else {
            if (meeting === undefined || meeting.deleted)
                return await res.status(404).json({ error: 'Meeting not found!' });

            const match = all_matches.find((elem) => meeting.match_id === elem.id);
            const mentor = all_mentors.find((user) => match.mentor_id === user.id);
            const mentee = all_mentees.find((user) => match.mentee_id === user.id);
            const mentor_user = all_users.find((user) => mentor.user_id === user.id);
            const mentee_user = all_mentors.find((user) => mentee.user_id === user.id);

            if (
                current_user.organization_id !== mentor_user.organization_id ||
                current_user.organization_id !== mentee_user.organization_id
            )
                return await res.status(403).json({ error: 'Access denied!' });
        }
        await Meetings.removeMeeting(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
