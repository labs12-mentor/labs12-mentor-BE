const apiValidator = require('./api');
const authValidator = require('./auth');
const experiencesValidator = require('./experiences');
const matchesValidator = require('./matches');
const menteeProfilesValidator = require('./menteeProfiles');
const mentorProfilesValidator = require('./mentorProfiles');
const meetingsValidator = require('./meetings');
const notificationsValidator = require('./notifications');
const organizationsValidator = require('./organizations');
const rolesValidator = require('./roles');
const usersValidator = require('./users');

module.exports = {
    apiValidator,
    authValidator,
    experiencesValidator,
    matchesValidator,
    menteeProfilesValidator,
    mentorProfilesValidator,
    meetingsValidator,
    notificationsValidator,
    organizationsValidator,
    rolesValidator,
    usersValidator
}