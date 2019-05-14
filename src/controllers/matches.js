module.exports = {
    getMatches,
    addMatch,
    getMatch,
    updateMatch,
    deleteMatch,
    removeMatch
};
const Matches = require('../database/helpers/matches');
const Mentors = require('../database/helpers/mentorProfiles');
const Mentees = require('../database/helpers/menteeProfiles');
const Notifications = require('../database/helpers/notifications');

async function getMatches(req, res) {
    try {
        const matches = await Matches.getMatches();

        return await res.status(200).json(matches);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMatch(req, res) {
    try {
        const matchData = ({ status, mentor_id, mentee_id } = req.body);
        const match = await Matches.getMatchByMentorAndMentee(
            matchData.mentor_id,
            matchData.mentee_id
        );
        if (match !== undefined)
            return await res.status(404).json({ error: 'Match already exists!' });

        const id = await Matches.insertMatch(matchData);

        await Mentors.updateMentorProfile(matchData.mentor_id, { status: 'UNAVAILABLE' });
        await Mentees.updateMenteeProfile(matchData.mentor_id, { status: 'UNAVAILABLE' });

        const mentor = await Mentors.getMentorProfileById(mentor_id);
        const mentee = await Mentees.getMenteeProfileById(mentee_id);

        await Notifications.insertNotification({
            user_id: mentor.user_id,
            content: 'You have been matched with your mentee!'
        });

        await Notifications.insertNotification({
            user_id: mentee.user_id,
            content: 'You have been matched with your mentor!'
        });

        return await res.status(201).json({ ...id, ...matchData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMatch(req, res) {
    try {
        const match = await Matches.getMatchById(req.params.id);
        if (match === undefined || match.deleted)
            return await res.status(404).json({ error: 'Match not found!' });
        return await res.status(200).json(match);
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMatch(req, res) {
    try {
        const match = await Matches.getMatchById(req.params.id);
        const matchData = ({ status, mentor_id, mentee_id } = req.body);
        if (match === undefined || match.deleted)
            return await res.status(404).json({ error: 'Match not found!' });
        await Matches.updateMatch(req.params.id, matchData);
        return await res.status(200).json({ id: req.params.id, ...matchData });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMatch(req, res) {
    try {
        const match = await Matches.getMatchById(req.params.id);
        if (match === undefined || match.deleted)
            return await res.status(404).json({ error: 'Match not found!' });
        await Matches.deleteMatch(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMatch(req, res) {
    try {
        const match = await Matches.getMatchById(req.params.id);
        if (match === undefined) return await res.status(404).json({ error: 'Match not found!' });
        await Matches.removeMatch(req.params.id);
        return await res.status(200).json({ id: req.params.id });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}
