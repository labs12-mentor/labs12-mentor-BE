const express = require('express');
const initServerMiddleware = require('./middleware/serverMiddleware');
const router = require('./routes');
const server = express();

initServerMiddleware(server);

server.use('/api', router);

module.exports = server;