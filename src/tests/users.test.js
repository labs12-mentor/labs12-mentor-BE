const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');
const Notifications = require('../database/helpers/notifications');

const AUTH_API_URL = 'api/auth';
const USERS_API_URL = '/api/users';

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
  organization_id: 1
};

const organization = {
  id: 1,
  name: 'Test Organization',
  logo: 'logo url',
  admin_id: 1
}

afterEach(async () => {
  await db('users').del();
  await db('organizations').del();
  await db('administrators').del();
  await db('owners').del();
});

beforeEach(async () => {
  await db('users').del();
  await db('organizations').del();
  await db('administrators').del();
  await db('owners').del();
});

async function createUser() {
  await db('administrators').insert([administrator])
  await db('organizations').insert([organization]);
  return await db('users').insert([user]);
}

describe('USERS ROUTER', () => {
    describe('GET ROUTE /', () => {
        it('should return 200 on success', async () => {
            await createUser();
            const res = await request(server)
                .get(USERS_API_URL);
            expect(res.status).toEqual(200);
        });

        it('should return empty array if there are no users', async () => {
            const res = await request(server)
                .get(USERS_API_URL);
            expect(res.body).toHaveLength(0);
        });

        it('should return array length of one', async () => {
            await createUser();
            const res = await request(server)
                .get(USERS_API_URL);
            expect(res.body).toHaveLength(1);
        });
    });

    describe('GET ROUTE /:id', () => {
        it('should return 200 on success', async () => {
            await createUser();
            const res = await request(server)
                .get(`${USERS_API_URL}/0`);
            expect(res.status).toEqual(200);
        });
    });

    describe('PUT ROUTE /:id', () => {
        it('should return 200 on success', async () => {
            const updatedUser = {
                username: 'updatedUser',
                password: 'updatedPassword',
                first_name: 'John',
                last_name: 'Doe',
                email: 'email@example.org',
                country: 'United States',
                state: 'CA',
                city: 'San Francisco',
                zipcode: '94131',
                organization_id: 1
            };

            await createUser();
            const res = await request(server)
                .put(`${USERS_API_URL}/0`, updatedUser);
            expect(res.status).toEqual(200);
        });

        it('should return message on success', async () => {
            const updatedUser = {
                username: 'updatedUser',
                password: 'updatedPassword',
                first_name: 'John',
                last_name: 'Doe',
                email: 'email@example.org',
                country: 'United States',
                state: 'CA',
                city: 'San Francisco',
                zipcode: '94131',
                organization_id: 1
            };

            await createUser();
            const res = await request(server)
                .put(`${USERS_API_URL}/0`, updatedUser);
            expect(res.body).toEqual({ message: 'update user API OK' });
        });
    });

    describe('DELETE ROUTE /:id', () => {
        it('should return 200 on success', async () => {
            await createUser();
            const res = await request(server)
                .delete(`${USERS_API_URL}/0`);
            expect(res.status).toEqual(200);
        });

        it('should return message on success', async () => {
            await createUser();
            const res = await request(server)
                .delete(`${USERS_API_URL}/0`);
            expect(res.body).toEqual({ message: 'delete user API OK' });
        });
    });

    describe('DELETE ROUTE /:id/remove', () => {
        it('should return 200 on success', async () => {

        });

        it('should return message on success', async () => {

        });
    });
});