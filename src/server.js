const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const initServerMiddleware = require('./middleware/serverMiddleware');
const router = require('./routes');
const apiServer = express();
const server = http.createServer(apiServer);

initServerMiddleware(apiServer);
require('./middleware/passport');

const io = socketio(server);
global.io = io;

apiServer.use('/api', router);

module.exports = server;