const request = require('supertest');
const server = require('../server');
const Users = require('../database/helpers/users');
const Owners = require('../database/helpers/owners');
const Administrators = require('../database/helpers/administrators');

const AUTH_API_URL = '/api/auth';

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

describe('AUTH ROUTER', () => {
  describe('POST ROUTE /LOGIN', () => {
    it('should return 200 on success', async () => {
      await createUser();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: user.username,
          password: user.password
        });
      expect(res.status).toEqual(200);
    });

    it('should return 404 on fail (no user found or deleted)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: user.username,
          password: user.password
        });
      expect(res.status).toEqual(404);
    });

    it('should return 400 on fail (no username)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: '',
          password: user.password
        });
      expect(res.status).toEqual(400);
    });

    it('should return 400 on fail (no password)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: user.username,
          password: ''
        });
      expect(res.status).toEqual(400);
    });

    it('should return a token on success', async () => {
      await createUser();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: user.username,
          password: user.password
        });
      expect(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)).toBe(true);
    });

    it('should return an error on fail (wrong password)', async () => {
      await createUser();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: user.username,
          password: 'wrongpassword'
        });
      expect(res.body).toEqual({ error: 'No user found!' });
    });

    it('should return an error on fail (no username)', async () => {
      await createUser();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: '',
          password: user.password
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });

    it('should return an error on fail (no password)', async () => {
      await createUser();
      const res = await request(server)
        .post(AUTH_API_URL + '/login')
        .send({
          username: user.username,
          password: ''
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });
  });

  describe('POST ROUTE /OWNER/LOGIN', () => {
    it('should return 200 on success', async () => {
      await createOwner();
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: owner.username,
          password: owner.password
        });
      expect(res.status).toEqual(200);
    });

    it('should return 404 on fail (no user found or deleted)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: owner.username,
          password: owner.password
        });
      expect(res.status).toEqual(404);
    });

    it('should return 400 on fail (no username)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: '',
          password: owner.password
        });
      expect(res.status).toEqual(400);
    });

    it('should return 400 on fail (no password)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: owner.username,
          password: ''
        });
      expect(res.status).toEqual(400);
    });

    it('should return a token on success', async () => {
      await createOwner();
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: owner.username,
          password: owner.password
        });
      expect(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)).toBe(true);
    });

    it('should return an error on fail (wrong password)', async () => {
      await createOwner();
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: owner.username,
          password: 'wrongpassword'
        });
      expect(res.body).toEqual({ error: 'No owner found!' });
    });

    it('should return an error on fail (no username)', async () => {
      await createOwner();
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: '',
          password: owner.password
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });

    it('should return an error on fail (no password)', async () => {
      await createOwner();
      const res = await request(server)
        .post(AUTH_API_URL + '/owner/login')
        .send({
          username: owner.username,
          password: ''
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });
  });

  describe('POST ROUTE /ADMIN/LOGIN', () => {
    it('should return 200 on success', async () => {
      await createAdministrator();
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: administrator.username,
          password: administrator.password
        });
      expect(res.status).toEqual(200);
    });

    it('should return 404 on fail (no user found or deleted)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: administrator.username,
          password: administrator.password
        });
      expect(res.status).toEqual(404);
    });

    it('should return 400 on fail (no username)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: '',
          password: administrator.password
        });
      expect(res.status).toEqual(400);
    });

    it('should return 400 on fail (no password)', async () => {
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: administrator.username,
          password: ''
        });
      expect(res.status).toEqual(400);
    });

    it('should return a token on success', async () => {
      await createAdministrator();
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: administrator.username,
          password: administrator.password
        });
      expect(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(res.body.token)).toBe(true);
    });

    it('should return an error on fail (wrong password)', async () => {
      await createAdministrator();
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: administrator.username,
          password: 'wrongpassword'
        });
      expect(res.body).toEqual({ error: 'No administrator found!' });
    });

    it('should return an error on fail (no username)', async () => {
      await createAdministrator();
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: '',
          password: administrator.password
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });

    it('should return an error on fail (no password)', async () => {
      await createAdministrator();
      const res = await request(server)
        .post(AUTH_API_URL + '/admin/login')
        .send({
          username: administrator.username,
          password: ''
        });
      expect(res.body).toEqual({ error: 'Login failed. Wrong credentials!' });
    });
  });
});
