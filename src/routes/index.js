const router = require('express').Router();
const { apiController } = require('../controllers');

const administrators = require('./administrators');
const auth = require('./auth');
const experiences = require('./experiences');
const matches = require('./matches');
const meetings = require('./meetings');
const menteeProfiles = require('./menteeProfiles');
const mentorProfiles = require('./mentorProfiles');
const notifications = require('./notifications');
const organizations = require('./organizations');
const owners = require('./owners');
const users = require('./users');

router.route('/')
    .get(apiController.rootRoute);

router.use('/administrators', administrators);
router.use('/auth', auth);
router.use('/experiences', experiences);
router.use('/matches', matches);
router.use('/meetings', meetings);
router.use('/mentees', menteeProfiles);
router.use('/mentors', mentorProfiles);
router.use('/notifications', notifications);
router.use('/organizations', organizations);
router.use('/owners', owners);
router.use('/users', users);

module.exports = router;