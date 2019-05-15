const router = require('express').Router();
const { matchesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');


router.route('/')
    .get(authenticate, authorize(['ALL']), matchesController.getMatches)
    .post(authenticate, authorize(['ALL']), matchesController.addMatch);

router.route('/available')
    .get(authenticate, authorize(['ALL']), matchesController.getAvailableMentors)

router.route('/:id')
    .get(authenticate, authorize(['ALL']), matchesController.getMatch)
    .put(authenticate, authorize(['ALL']), matchesController.updateMatch)
    .delete(authenticate, authorize(['ALL']), matchesController.deleteMatch);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ALL']), matchesController.removeMatch);

module.exports = router;
