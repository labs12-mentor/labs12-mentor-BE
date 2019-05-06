const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');

const AUTH_API_URL = '/api/auth';

const user = {
  email: 'user@example.org',
  password: 'password',
  first_name: 'Admin',
  last_name: 'User',
  organization_id: 1
}

const organization = {
  name: 'Test Organization',
  description: 'Test organization description',
  logo: 'logo url'
}

async function cleanup(){
  await db('users').del();
  await db.schema.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await db('organizations').del();
  await db.schema.raw('ALTER SEQUENCE organizations_id_seq RESTART WITH 1');
}

afterEach(async () => {
  return await cleanup();
});

beforeEach(async () => {
  return await cleanup();
});

async function registerOrganization() {
  return await request(server)
    .post(AUTH_API_URL + '/register')
    .send({
      organization_name: organization.name,
      organization_description: organization.description,
      organization_logo: organization.logo,
      user_email: user.email,
      user_password: user.password,
      user_first_name: user.first_name,
      user_last_name: user.last_name
    });
}

describe('AUTH ROUTER', () => {
  describe('POST ROUTE /LOGIN', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();

      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: user.password
        });
      expect(res.status).toEqual(200);
    });

    it('should return 404 on fail (no user found)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: user.password
        });
      expect(res.status).toEqual(404);
    });

    it('should return 400 on fail (no email)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: '',
          password: user.password
        });
      expect(res.status).toEqual(400);
    });

    it('should return 400 on fail (no password)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: ''
        });
      expect(res.status).toEqual(400);
    });

    it('should return 401 on fail (wrong password)', async () => {
      await registerOrganization();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: 'wrong password'
        });
      expect(res.status).toEqual(401);
    });

    it('should return a token on success', async () => {
      await registerOrganization();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: user.password
        });
      expect(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)).toBe(true);
    });
  
    it('should return an error on fail (no user found)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: user.password
        });
      expect(res.body).toEqual({ error: 'Cannot log in! User not found.' });
    });

    it('should return an error on fail (wrong password)', async () => {
      await registerOrganization();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: 'wrongpassword'
        });
      expect(res.body).toEqual({ error: 'Cannot log in! Wrong credentials.' });
    });

    it('should return an error on fail (no email)', async () => {
      await registerOrganization();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: '',
          password: user.password
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });

    it('should return an error on fail (no password)', async () => {
      await registerOrganization();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          email: user.email,
          password: ''
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });
  });

  describe('POST ROUTE /REGISTER', () => {
    it('should return 201 on success', async () => {
      const res = await registerOrganization();
      expect(res.status).toEqual(201);
    });

    it('should return a message on success', async () => {
      const res = await registerOrganization();
      expect(res.body).toEqual({ message: 'User successfully registered!' });
    });

    it('should return 400 on fail (no organization name)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/register')
        .send({
          organization_name: '',
          organization_description: organization.description,
          organization_logo: organization.logo,
          user_email: user.email,
          user_password: user.password,
          user_first_name: user.first_name,
          user_last_name: user.last_name
        });
      expect(res.status).toEqual(400);
    });

    it('should return 400 on fail (no email)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/register')
        .send({
          organization_name: organization.name,
          organization_description: organization.description,
          organization_logo: organization.logo,
          user_email: '',
          user_password: user.password,
          user_first_name: user.first_name,
          user_last_name: user.last_name
        });
      expect(res.status).toEqual(400);
    });

    it('should return 400 on fail (no password)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/register')
        .send({
          organization_name: organization.name,
          organization_description: organization.description,
          organization_logo: organization.logo,
          user_email: user.email,
          user_password: '',
          user_first_name: user.first_name,
          user_last_name: user.last_name
        });
      expect(res.status).toEqual(400);
    });

    it('should return message on fail (no organization name)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/register')
        .send({
          organization_name: '',
          organization_description: organization.description,
          organization_logo: organization.logo,
          user_email: user.email,
          user_password: user.password,
          user_first_name: user.first_name,
          user_last_name: user.last_name
        });
      expect(res.body).toEqual({ error: 'Cannot register organization or user - missing required fields!' });
    });

    it('should return message on fail (no email)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/register')
        .send({
          organization_name: organization.name,
          organization_description: organization.description,
          organization_logo: organization.logo,
          user_email: '',
          user_password: user.password,
          user_first_name: user.first_name,
          user_last_name: user.last_name
        });
      expect(res.body).toEqual({ error: 'Cannot register organization or user - missing required fields!' });
    });

    it('should return message on fail (no password)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/register')
        .send({
          organization_name: organization.name,
          organization_description: organization.description,
          organization_logo: organization.logo,
          user_email: user.email,
          user_password: '',
          user_first_name: user.first_name,
          user_last_name: user.last_name
        });
      expect(res.body).toEqual({ error: 'Cannot register organization or user - missing required fields!' });
    });

    it('should return 500 on fail (user or organization already registered)', async () => {
      await registerOrganization();
      const res = await registerOrganization();
      expect(res.status).toEqual(404);
    });

    it('should return message on fail (user or organization already registered)', async () => {
      await registerOrganization();
      const res = await registerOrganization();
      expect(res.body).toEqual({ error: 'User or organization already exists!' });
    });
  });
});
