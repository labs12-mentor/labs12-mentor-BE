const router = require('express').Router();
const { organizationsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ADMINISTRATOR']), organizationsController.getOrganizations);

router.route('/:id')
    .get(authenticate, authorize(['ALL']),organizationsController.getOrganization)
    .put(authenticate, authorize(['ADMINISTRATOR', 'OWNER', 'MANAGER']),organizationsController.updateOrganization)
    .delete(authenticate, authorize(['ADMINISTRATOR', 'OWNER']), organizationsController.deleteOrganization);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ADMINISTRATOR']), organizationsController.removeOrganization);

module.exports = router;
