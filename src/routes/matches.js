const router = require('express').Router();
const { matchesController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), matchesController.getMatches)
    .post(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']), matchesController.addMatch);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), matchesController.getMatch)
    .put(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']), matchesController.updateMatch)
    .delete(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']), matchesController.deleteMatch);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ADMINISTRATOR']), matchesController.removeMatch);

module.exports = router;
