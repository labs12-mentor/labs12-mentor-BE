const router = require('express').Router();
const { matchesController } = require('../controllers');

router.route('/')
    .get(matchesController.getMatches)
    .post(matchesController.addMatch);

router.route('/:id')
    .get(matchesController.getMatch)
    .put(matchesController.updateMatch)
    .delete(matchesController.deleteMatch);

router.route('/:id/remove')
    .delete(matchesController.removeMatch);

module.exports = router;