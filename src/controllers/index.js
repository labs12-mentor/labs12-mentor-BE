const apiController = require('./api');
const authController = require('./auth');
const contactController = require('./contact');
const experiencesController = require('./experiences');
const filesController = require('./files');
const invitationsController = require('./invitations');
const matchesController = require('./matches');
const menteeProfilesController = require('./menteeProfiles');
const mentorProfilesController = require('./mentorProfiles');
const meetingsController = require('./meetings');
const notificationsController = require('./notifications');
const organizationsController = require('./organizations');
const usersController = require('./users');

module.exports = {
    apiController,
    authController,
    contactController,
    experiencesController,
    filesController,
    invitationsController,
    matchesController,
    menteeProfilesController,
    mentorProfilesController,
    meetingsController,
    notificationsController,
    organizationsController,
    usersController
}