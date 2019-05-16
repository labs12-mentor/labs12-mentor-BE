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

        if (match.mentee_id !== matchData.mentee_id) {
            const mentor = await Mentors.getMentorProfileById(matchData.mentor_id);
            await Notifications.insertNotification({
                user_id: mentor.user_id,
                content: 'Your match has been updated - now you are matched with a new mentee!'
            });

            await Mentees.updateMenteeProfile(match.mentee_id, { status: 'AVAILABLE' });
            const old_mentee = await Mentees.getMenteeProfileById(match.mentee_id);
            await Notifications.insertNotification({
                user_id: old_mentee.user_id,
                content: 'Your match has been removed!'
            });

            await Mentees.updateMenteeProfile(matchData.mentee_id, { status: 'UNAVAILABLE' });
            const new_mentee = await Mentees.getMenteeProfileById(matchData.mentee_id);
            await Notifications.insertNotification({
                user_id: new_mentee.user_id,
                content: 'You have been matched with your mentor!'
            });
        }

        if (match.mentor_id !== matchData.mentor_id) {
            const mentee = await Mentees.getMenteeProfileById(mentee_id);
            await Notifications.insertNotification({
                user_id: mentee.user_id,
                content: 'Your match has been updated - now you are matched with a new mentor!'
            });

            await Mentors.updateMentorProfile(match.mentor_id, { status: 'AVAILABLE' });
            const old_mentor = await Mentors.getMentorProfileById(match.mentor_id);
            await Notifications.insertNotification({
                user_id: old_mentor.user_id,
                content: 'Your match has been removed!'
            });

            await Mentors.updateMentorProfile(matchData.mentor_id, { status: 'UNAVAILABLE' });
            const new_mentor = await Mentors.getMentorProfileById(matchData.mentor_id);
            await Notifications.insertNotification({
                user_id: new_mentor.user_id,
                content: 'You have been matched with your mentee!'
            });
        }

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
