const router = require('express').Router();
const { ownersController } = require('../controllers');

router.route('/')
    .get(ownersController.getOwners);

router.route('/:id')
    .get(ownersController.getOwner)
    .put(ownersController.updateOwner)
    .delete(ownersController.deleteOwner);

router.route('/:id/remove')
    .delete(ownersController.removeOwner);

module.exports = router;
