const request = require("supertest");
const server = require("../server");
const Mentor = require("../database/helpers/mentorProfiles");
const Users = require('../database/helpers/users');
const Owners = require('../database/helpers/owners');
const Administrators = require('../database/helpers/administrators');


const AUTH_API_URL = '/api/auth';