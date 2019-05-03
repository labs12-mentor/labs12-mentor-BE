const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');
const Notifications = require('../database/helpers/notifications');

const AUTH_API_URL = 'api/auth';
const NOTIFICATION_API_URL = '/api/notifications';

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

const notification = {
  user_id: 1,
  content: 'You have been notified.'
}

afterEach(async () => {
  await db('notifications').del();
  await db('users').del();
  await db('organizations').del();
  await db('administrators').del();
  await db('owners').del();
});

beforeEach(async () => {
  await db('notifications').del();
  await db('users').del();
  await db('organizations').del();
  await db('administrators').del();
  await db('owners').del();
});

async function createNotification() {
  await db('administrators').insert([administrator])
  await db('organizations').insert([organization]);
  await db('users').insert([user]);
  return await db('notifications').insert([notification]);
}

describe('NOTIFICATIONS ROUTER', () => {
  describe('GET ROUTE /', () => {
    it('should return 200 on success', async () => {
      await createNotification();
      const res = await request(server)
        .get(NOTIFICATION_API_URL);
      console.log(res.body);
      expect(res.status).toEqual(200);
    });

    it('should return empty array if there are no notifications', async () => {
      const res = await request(server)
        .get(NOTIFICATION_API_URL);
      console.log(res.body);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('POST ROUTE /', () => {
    it('should return 200 on success', async () => {
      const res = await request(server)
        .post(NOTIFICATION_API_URL, notification);
      expect(res.status).toEqual(200);
    });

    it('should return message on success', async () => {
      const res = await request(server)
        .post(NOTIFICATION_API_URL, notification);
      expect(res.body).toEqual({ message: 'add notification API OK' });
    });

    it('should return error if notification has no content', async () => {
      const noContentNotification = {
        user_id: 1
      };

      const res = await request(server)
        .post(NOTIFICATION_API_URL, noContentNotification);
        console.log(res.body);
      expect(res.status).toEqual(400);
    });
  });

  describe('GET ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await createNotification();
      const res = await request(server)
        .get(`${NOTIFICATION_API_URL}/0`);
      expect(res.status).toEqual(200);
    });

    it('should return 400 on failed fetch', async () => {
      const res = await request(server)
        .get(`${NOTIFICATION_API_URL}/0`);
      expect(res.status).toEqual(400);
    });
  });

  describe('PUT ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await createNotification();
      const res = await request(server)
        .put(`${NOTIFICATION_API_URL}/0`);
      expect(res.status).toEqual(200);
    });

    it('should return message on success', async () => {
      await createNotification();
      const alteredNotification = {
        user_id: 1,
        content: "This is the updated notification."
      };

      const res = await request(server)
        .put(`${NOTIFICATION_API_URL}/0`, alteredNotification);
      expect(res.body).toEqual({ message: 'update notification API OK' });
    });
  });

  describe('PATCH ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await createNotification();
      const res = await request(server)
        .patch(`${NOTIFICATION_API_URL}/0`);
      expect(res.status).toEqual(200);
    });

    it('should return message on success', async () => {
      await createNotification();
      const alteredNotification = {
        user_id: 1,
        content: "This is the updated notification."
      };

      const res = await request(server)
        .patch(`${NOTIFICATION_API_URL}/0`, alteredNotification);
      expect(res.body).toEqual({ message: 'mark notification API OK' });
    });
  });

  describe('DELETE ROUTE /:id', () => {
    it('should return 200 on success', async () => {
      await createNotification();
      const res = await request(server)
        .delete(`${NOTIFICATION_API_URL}/0`);
      expect(res.status).toEqual(200);
    });

    it('should return a message on success', async () => {
      await createNotification();
      const res = await request(server)
        .delete(`${NOTIFICATION_API_URL}/0`);
      expect(res.body).toEqual({ message: 'delete notification API OK' });
    });
  });

  //describe delete route /:id/remove
  describe('DELETE ROUTE /:id/remove', () => {
    it('should return 200 on success', async () => {
      
    });

    it('should return a message on success', async () => {

    });
  });
});