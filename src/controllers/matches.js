module.exports = {
    getMatches,
    addMatch,
    getMatch,
    updateMatch,
    deleteMatch,
    removeMatch
}
const Matches = require('../database/helpers/matches');

async function getMatches(req, res){
    try {
        const matches = await Matches.getMatches();

        return await res.status(200).json(matches);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function addMatch(req, res){
    try {
        const matchData = {
            status,
            mentor_id,
            mentee_id
        } = req.body;
        const match = await Matches.getMatchByMentorAndMentee(matchData.mentor_id, matchData.mentee_id);
        if(match !== undefined) return await res.status(404).json({ error: 'Match already exists!' });
        await Matches.insertMatch(matchData);
        return await res.status(200).json({ message: 'Match successfully added!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getMatch(req, res){
    try {
        const match = await Matches.getMatchById(req.params.id);
        if(match === undefined || match.deleted) return await res.status(404).json({ error: 'Match not found!' });
        return await res.status(200).json(match);
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function updateMatch(req, res){
    try {
        const match = await Matches.getMatchById(req.params.id);
        const matchData = {
            status,
            mentor_id,
            mentee_id
        } = req.body;
        if(match === undefined || match.deleted) return await res.status(404).json({ error: 'Match not found!' });
        await Matches.updateMatch(req.params.id, matchData);
        return await res.status(200).json({ message: 'Match successfully updated!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function deleteMatch(req, res){
    try {
        const match = await Matches.getMatchById(req.params.id);
        if(match === undefined || match.deleted) return await res.status(404).json({ error: 'Match not found!' });
        await Matches.deleteMatch(req.params.id);
        return await res.status(200).json({ message: 'Match successfully deleted!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function removeMatch(req, res){
    try {
        const match = await Matches.getMatchById(req.params.id);
        if(match === undefined) return await res.status(404).json({ error: 'Match not found!' });
        await Matches.removeMatch(req.params.id);
        return await res.status(200).json({ message: 'Match successfully removed!' });
    } catch(error) {
        return await res.status(500).json({ error: error.message });
    }
}
