const router = require('express').Router();
const { administratorsController } = require('../controllers');

router.route('/')
    .get(administratorsController.getAdministrators);

router.route('/:id')
    .get(administratorsController.getAdministrator)
    .put(administratorsController.updateAdministrator)
    .delete(administratorsController.deleteAdministrator);

router.route('/:id/remove')
    .delete(administratorsController.removeAdministrator);

module.exports = router;
