const router = require('express').Router();
const controllers = require('../controllers');

router.route('/')
    .get(controllers.usersController.getAllUsers);

router.route('/:id')
    .get(controllers.usersController.getUser)
    .put(controllers.usersController.updateUser)
    .delete(controllers.usersController.deleteUser);

router.route('/:id/remove')
    .delete(controllers.usersController.removeUser);

module.exports = router;
