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
    const matches = await Matches.getMatches();
    res.status(200).json(matches);
}

async function addMatch(req, res){
    res.status(200).json({ message: 'add match API OK' });
}

async function getMatch(req, res){
    const match = await Matches.getMatchById(req.params.id);
    res.status(200).json(match);
}

async function updateMatch(req, res){
    res.status(200).json({ message: 'update match API OK' });
}

async function deleteMatch(req, res){
    res.status(200).json({ message: 'delete match API OK' });
}

async function removeMatch(req, res){
    res.status(200).json({ message: 'remove match API OK' });
}
