const request = require('supertest');
const server = require('../server');
const Orgs = require('../database/helpers/organizations');

const ORGS_API_URL = '/api/organizations';

//check this structure
const organization = {
  name: 'Duke University',
  logo: 'logo-file-name.png',
  admin_id: 0,
  deleted: false,
}

//before and after each list
beforeEach(async () => {
  await Orgs.truncate();
});

afterEach(async () => {
  await Orgs.truncate();
})

async function getOrganizations(){
  return await request(server)
    .get(ORGS_API_URL);
}

async function insertOrganization(){
  return await request(server)
    .post(ORGS_API_URL)
    .send(organization);
}

async function getOrganizationById(){
  return await request(server)
    .get(ORGS_API_URL + '/:id')
}

async function updateOrganization(){
  return await request(server)
    .put(ORGS_API_URL + '/:id')
    .send(organization);
}

async function deleteOrganization(){
  return await request(server)
    .delete(ORGS_API_URL + '/:id')
    .send(organization)
}

async function removeOrganization(){
  return await request(server)
    .delete(ORGS_API_URL + '/:id/remove')
    .send(organization)
}

describe('ORG ROUTER', () => {
  describe('GET ROUTE /', () => {
    it('should return 200 on success', async () => {
      await getOrganizations();
      const res = await request(server)
        .get(ORGS_API_URL)
      expect(res.status).toEqual(200);
    })
    //should this be 500 or 404 (no users?)
    it('should return 500 on fail (cannot access database', async () => {
      await getOrganizations();
      const res = await request(server)
        .get(ORGS_API_URL)
      expect(res.status).toEqual(500);
    })
  })
  describe('POST ROUTE /', () => {
    it('should return 200 on success', () => {
      await insertOrganization();
      const res = await request(server)
        .post(ORGS_API_URL)
        //check this structure
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
          deleted: false,
        })
      expect(res.status).toEqual(200);
    })
    it('should return 500 on fail', () => {
      await insertOrganization();
      const res = await request(server)
        .post(ORGS_API_URL)
        .send(organization)
      expect(res.status).toEqual(500);
    })
  })
  describe('')

})