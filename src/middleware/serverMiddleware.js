require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

module.exports = server => {
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(morgan('dev'));
    server.use(helmet());
    server.use(cors());
    server.use(session({ 
        secret: process.env.SESSION_SECRET, 
        resave: true, 
        saveUninitialized: true
    }));
    server.use(passport.initialize());
    server.use(passport.session());
};
