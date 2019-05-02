const router = require('express').Router();
const { organizationsController } = require('../controllers');

router.route('/')
    .get(organizationsController.getOrganizations);

router.route('/:id')
    .get(organizationsController.getOrganization)
    .put(organizationsController.updateOrganization)
    .delete(organizationsController.deleteOrganization);

router.route('/:id/remove')
    .delete(organizationsController.removeOrganization);

module.exports = router;
