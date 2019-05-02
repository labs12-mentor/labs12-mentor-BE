const router = require('express').Router();
const { invitationsController } = require('../controllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(authenticate, authorize(['ALL']), invitationsController.getAllInvitations)
    .post(authenticate, authorize(['ALL']), invitationsController.addInvitation);

router.route('/:id')
    .get(invitationsController.getInvitation)
    .post(invitationsController.register)
    .delete(authenticate, authorize(['ALL']), invitationsController.deleteInvitation);

router.route('/:id/remove')
    .delete(authenticate, authorize(['ALL']), invitationsController.removeInvitation);

module.exports = router;
