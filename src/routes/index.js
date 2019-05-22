const router = require('express').Router();
const { apiController } = require('../controllers');
const socketMiddleware = require('../middleware/socketMiddleware');

const auth = require('./auth');
const contact = require('./contact');
const experiences = require('./experiences');
const invitations = require('./invitations');
const matches = require('./matches');
const meetings = require('./meetings');
const menteeProfiles = require('./menteeProfiles');
const mentorProfiles = require('./mentorProfiles');
const notifications = require('./notifications');
const organizations = require('./organizations');
const users = require('./users');

// router.use(socketMiddleware);
router.use((req, res, next) => {
	if(req.query.socketId) req.session.socketId = req.query.socketId;
    next();
});

router.route('/')
    .get(apiController.rootRoute);

router.use('/auth', auth);
router.use('/contact', contact)
router.use('/experiences', experiences);
router.use('/invitations', invitations);
router.use('/matches', matches);
router.use('/meetings', meetings);
router.use('/mentees', menteeProfiles);
router.use('/mentors', mentorProfiles);
router.use('/notifications', notifications);
router.use('/organizations', organizations);
router.use('/users', users);

module.exports = router;