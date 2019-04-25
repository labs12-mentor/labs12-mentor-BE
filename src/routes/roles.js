const router = require('express').Router();
const controllers = require('../controllers');

router.route('/')
    .get(controllers.rolesController.getAllRoles)
    .post(controllers.rolesController.addNewRole);

router.route('/:id')
    .get(controllers.rolesController.getRole)
    .put(controllers.rolesController.updateRole)
    .delete(controllers.rolesController.deleteRole);

router.route('/:id/remove')
    .delete(controllers.rolesController.removeRole);

module.exports = router;
