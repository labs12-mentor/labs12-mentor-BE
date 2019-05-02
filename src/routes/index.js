const router = require('express').Router();
const { apiController } = require('../controllers');

const auth = require('./auth');
const experiences = require('./experiences');
const invitations = require('./invitations');
const matches = require('./matches');
const meetings = require('./meetings');
const menteeProfiles = require('./menteeProfiles');
const mentorProfiles = require('./mentorProfiles');
const notifications = require('./notifications');
const organizations = require('./organizations');
const users = require('./users');

router.route('/')
    .get(apiController.rootRoute);

router.use('/auth', auth);
router.use('/experiences', experiences);
router.use('/invite', invitations);
router.use('/matches', matches);
router.use('/meetings', meetings);
router.use('/mentees', menteeProfiles);
router.use('/mentors', mentorProfiles);
router.use('/notifications', notifications);
router.use('/organizations', organizations);
router.use('/users', users);

module.exports = router;