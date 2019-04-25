const router = require('express').Router();
const { rolesController } = require('../controllers');

router.route('/')
    .get(rolesController.getAllRoles)
    .post(rolesController.addNewRole);

router.route('/:id')
    .get(rolesController.getRole)
    .put(rolesController.updateRole)
    .delete(rolesController.deleteRole);

router.route('/:id/remove')
    .delete(rolesController.removeRole);

module.exports = router;
