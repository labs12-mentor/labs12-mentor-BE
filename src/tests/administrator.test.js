const request = require('supertest');
const server = require('../server');
const Users = require('../database/helpers/users');
const Owners = require('../database/helpers/owners');
const Administrators = require('../database/helpers/administrators');

const AUTH_API_URL = '/api/administrators';

const owner = {
    username: 'user',
    password: 'password',
    email: 'email@example.org',
    company_name: 'Lambda School'
  };
  
  const administrator = {
    username: 'user',
    password: 'password',
    first_name: 'John',
    last_name: 'Doe',
    email: 'email@example.org',
    company_name: 'Lambda School'
  }
  
  const user = {
    username: 'user',
    password: 'password',
    first_name: 'John',
    last_name: 'Doe',
    email: 'email@example.org',
    country: 'United States',
    state: 'CA',
    city: 'San Francisco',
    zipcode: '94131',
    role_id: 0,
    organization_id: 0
  };
  
  afterEach(async () => {
    await Users.truncate();
    await Owners.truncate();
    await Administrators.truncate();
  });
  
  beforeEach(async () => {
    await Users.truncate();
    await Owners.truncate();
    await Administrators.truncate();
  });
  
  async function createUser() {
    return await request(server)
      .post(AUTH_API_URL + '/register')
      .send(user);
  }
  
  async function createOwner() {
    return await request(server)
      .post(AUTH_API_URL + '/owner/register')
      .send(owner);
  }
  
  async function createAdministrator() {
    return await request(server)
      .post(AUTH_API_URL + '/admin/register')
      .send(administrator);
  }

describe('ADMIN ROUTER', () => {
    describe('GET ROUTE /', () => {
        it('should return 200 on success', async () => {
            const res = await request(server)
                .get(AUTH_API_URL);
            expect(res.status).toEqual(200);
        })
    })

    describe('GET ROUTE /:id', () => {
        it('should return 200 on success', async () => {
            await createAdministrator();
            const res = await request(server)
                .get(AUTH_API_URL + '/0');
            expect(res.status).toEqual(200);
        })
    })
})