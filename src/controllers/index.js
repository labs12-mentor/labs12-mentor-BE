const apiController = require('./api');
const usersController = require('./users');
const rolesController = require('./roles');
const authController = require('./auth');

module.exports = {
    apiController,
    authController,
    usersController,
    rolesController
}