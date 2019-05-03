const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');
const Users = require('../database/helpers/users');
const bcrypt = require('bcryptjs');

const AUTH_API_URL = '/api/auth';
const USERS_API_URL = '/api/users';

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


const administrator = {
  email: 'email@example.org',
  password: 'password',
  role: 'ADMINISTRATOR',
  organization_id: 1
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

async function addAdministrator() {
  return await Users.insertUser({
    ...administrator,
    password: bcrypt.hashSync(administrator.password, 10)
  });
}

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

async function loginUser(email, password) {
  return await request(server)
    .post(AUTH_API_URL + '/login')
    .send({
      email: email,
      password: password
    });
}

describe('USERS ROUTER', () => {
  describe('GET ROUTE /', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();
      await addAdministrator();

      const res_token = await loginUser(administrator.email, administrator.password);

      const res = await request(server)
        .get(USERS_API_URL+'/')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(200);
    });

    it('should return an array on success', async () => {
      await registerOrganization();
      await addAdministrator();

      const res_token = await loginUser(administrator.email, administrator.password);

      const res = await request(server)
        .get(USERS_API_URL+'/')
        .set('Authorization', res_token.body.token);
      
      expect(Array.isArray(res.body)).toEqual(true);
    });

    it('should return 403 on fail (not authorized)', async () => {
      await registerOrganization();
      await addAdministrator();

      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .get(USERS_API_URL+'/')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(403);
    });

    it('should return an error on fail (not authorized)', async () => {
      await registerOrganization();
      await addAdministrator();

      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .get(USERS_API_URL+'/')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ error: 'Not authorized' });
    });
  });

  describe('GET ROUTE /current_user', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .get(USERS_API_URL+'/current_user')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(200);
    });

    it('should return an object on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .get(USERS_API_URL+'/current_user')
        .set('Authorization', res_token.body.token);
      
      const { password, ...response } = res.body;

      expect(response).toEqual({
        id: 1,
        city: null,
        country: null,
        deleted: false,
        role: 'OWNER',
        state: null,
        street: null,
        zipcode: null,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        organization_id: 1
      });
    });

    it('should return 401 on fail (no token provided)', async () => {
      await registerOrganization();
      const res = await request(server)
        .get(USERS_API_URL+'/current_user');
      
      expect(res.status).toEqual(401);
    });

    it('should return an error on fail (no token provided)', async () => {
      await registerOrganization();
      const res = await request(server)
        .get(USERS_API_URL+'/current_user');
      
      expect(res.body).toEqual({ error: 'No token provided!' });
    });
  });

  describe('GET ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .get(USERS_API_URL+'/1')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(200);
    });

    it('should return an object on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .get(USERS_API_URL+'/1')
        .set('Authorization', res_token.body.token);
      
      const { password, ...response } = res.body;

      expect(response).toEqual({
        id: 1,
        city: null,
        country: null,
        deleted: false,
        role: 'OWNER',
        state: null,
        street: null,
        zipcode: null,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        organization_id: 1
      });
    });

    it('should return 401 on fail (no token provided)', async () => {
      await registerOrganization();
      const res = await request(server)
        .get(USERS_API_URL+'/1');
      
      expect(res.status).toEqual(401);
    });

    it('should return an error on fail (no token provided)', async () => {
      await registerOrganization();
      const res = await request(server)
        .get(USERS_API_URL+'/1');
      
      expect(res.body).toEqual({ error: 'No token provided!' });
    });

    it('should return 404 on fail (user not found)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);
      const res = await request(server)
        .get(USERS_API_URL+'/100')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(404);
    });

    it('should return an error on fail (user not found)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);
      const res = await request(server)
        .get(USERS_API_URL+'/100')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ error: 'User not found!' });
    });
  });

  describe('PUT ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .put(USERS_API_URL+'/1', {
          ...user,
          password: undefined,
          email: 'example2@example.org'
        })
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(200);
    });

    it('should return a message on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .put(USERS_API_URL+'/1', {
          ...user,
          password: undefined,
          email: 'example2@example.org'
        })
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ message: 'User successfully updated!' });
    });

    it('should return 401 on fail (no token provided)', async () => {
      await registerOrganization();

      const res = await request(server)
        .put(USERS_API_URL+'/1', {
          ...user,
          password: undefined,
          email: 'example2@example.org'
        });
      
      expect(res.status).toEqual(401);
    });

    it('should return an error on fail (no token provided)', async () => {
      await registerOrganization();

      const res = await request(server)
        .put(USERS_API_URL+'/1', {
          ...user,
          password: undefined,
          email: 'example2@example.org'
        })
      expect(res.body).toEqual({ error: 'No token provided!' });
    });

    it('should return 404 on fail (user not found)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .put(USERS_API_URL+'/100', {
          ...user,
          password: undefined,
          email: 'example2@example.org'
        })
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(404);
    });

    it('should return an error on fail (user not found)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .put(USERS_API_URL+'/100', {
          ...user,
          password: undefined,
          email: 'example2@example.org'
        })
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ error: 'User not found!' });
    });
  });

  describe('DELETE ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/1')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(200);
    });

    it('should return a message on success', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/1')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ message: 'User successfully deleted!' });
    });

    it('should return 401 on fail (no token provided)', async () => {
      await registerOrganization();

      const res = await request(server)
        .delete(USERS_API_URL+'/1');
      
      expect(res.status).toEqual(401);
    });

    it('should return an error on fail (no token provided)', async () => {
      await registerOrganization();

      const res = await request(server)
        .delete(USERS_API_URL+'/1');

      expect(res.body).toEqual({ error: 'No token provided!' });
    });

    it('should return 404 on fail (user not found)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/100')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(404);
    });

    it('should return an error on fail (user not found)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/100')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ error: 'User not found!' });
    });
  });

  describe('DELETE ROUTE /:id/remove', () => {
    it('should return 200 on success', async () => {
      await registerOrganization();
      await addAdministrator();
      const res_token = await loginUser(administrator.email, administrator.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/1/remove')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(200);
    });

    it('should return a message on success', async () => {
      await registerOrganization();
      await addAdministrator();
      const res_token = await loginUser(administrator.email, administrator.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/1/remove')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ message: 'User successfully removed!' });
    });

    it('should return 401 on fail (no token provided)', async () => {
      await registerOrganization();

      const res = await request(server)
        .delete(USERS_API_URL+'/1/remove');
      
      expect(res.status).toEqual(401);
    });

    it('should return an error on fail (no token provided)', async () => {
      await registerOrganization();

      const res = await request(server)
        .delete(USERS_API_URL+'/1/remove');

      expect(res.body).toEqual({ error: 'No token provided!' });
    });

    it('should return 404 on fail (user not found)', async () => {
      await registerOrganization();
      await addAdministrator();
      const res_token = await loginUser(administrator.email, administrator.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/100/remove')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(404);
    });

    it('should return an error on fail (user not found)', async () => {
      await registerOrganization();
      await addAdministrator();
      const res_token = await loginUser(administrator.email, administrator.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/100/remove')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ error: 'User not found!' });
    });

    it('should return 403 on fail (wrong role)', async () => {
      await registerOrganization();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/1/remove')
        .set('Authorization', res_token.body.token);
      
      expect(res.status).toEqual(403);
    });

    it('should return an error on fail (wrong role)', async () => {
      await registerOrganization();
      await addAdministrator();
      const res_token = await loginUser(user.email, user.password);

      const res = await request(server)
        .delete(USERS_API_URL+'/1/remove')
        .set('Authorization', res_token.body.token);
      
      expect(res.body).toEqual({ error: 'Not authorized' });
    });
  });
});