require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const APP_ENV = process.env.APP_ENV || 'development';

module.exports = knex(knexConfig[APP_ENV]);
