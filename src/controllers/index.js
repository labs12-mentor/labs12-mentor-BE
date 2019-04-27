const administratorsController = require('./administrators');
const apiController = require('./api');
const authController = require('./auth');
const experiencesController = require('./experiences');
const matchesController = require('./matches');
const menteeProfilesController = require('./menteeProfiles');
const mentorProfilesController = require('./mentorProfiles');
const meetingsController = require('./meetings');
const notificationsController = require('./notifications');
const organizationsController = require('./organizations');
const ownersController = require('./owners');
const rolesController = require('./roles');
const usersController = require('./users');

module.exports = {
    administratorsController,
    apiController,
    authController,
    experiencesController,
    matchesController,
    menteeProfilesController,
    mentorProfilesController,
    meetingsController,
    notificationsController,
    organizationsController,
    ownersController,
    rolesController,
    usersController
}