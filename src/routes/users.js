const router = require('express').Router();
const { usersController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ADMINISTRATOR']), usersController.getAllUsers);

router.route('/current_user')
    .get(authenticate, authorize(['ALL']), usersController.getCurrentUser);

router.route('/:id')
    .get(authenticate, authorize(['ALL']), usersController.getUser)
    .put(authenticate, authorize('ALL'), usersController.updateUser)
    .delete(authenticate, authorize(['ALL']), usersController.deleteUser);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ADMINISTRATOR']), usersController.removeUser);

module.exports = router;
