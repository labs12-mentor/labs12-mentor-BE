const router = require('express').Router();
const { usersController } = require('../controllers');

router.route('/')
    .get(usersController.getAllUsers);

router.route('/:id')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

router.route('/:id/remove')
    .delete(usersController.removeUser);

module.exports = router;
