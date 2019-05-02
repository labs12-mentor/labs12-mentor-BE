const router = require('express').Router();
const { organizationsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), organizationsController.getOrganizations);

router.route('/:id')
    .get(authenticate, authorize(['ALL']),organizationsController.getOrganization)
    .put(authenticate, authorize(['ALL']),organizationsController.updateOrganization)
    .delete(authenticate, authorize(['ALL']), organizationsController.deleteOrganization);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ALL']), organizationsController.removeOrganization);

module.exports = router;
