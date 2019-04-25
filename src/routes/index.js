const router = require('express').Router();
const controllers = require('../controllers');

const users = require('./users');
const auth = require('./auth');
const roles = require('./roles');

router.route('/')
    .get(controllers.apiController.rootRoute);


router.use('/users', users);
router.use('/auth', auth);
router.use('/roles', roles);

module.exports = router;