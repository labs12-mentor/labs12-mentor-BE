const request = require('supertest');
const server = require('../server');
const Orgs = require('../database/helpers/organizations');

const ORGS_API_URL = '/api/organizations';

//check this structure
const organization = {
  name: 'Duke University',
  logo: 'logo-file-name.png',
  admin_id: 0,
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
    //it should return an object
    it('should return an object (organizations', async () => {
      await getOrganizations();
      const res = await request(server)
        .get(ORGS_API_URL)
      expect(res.body).toEqual({ organizations })
    })
    //should this be 500 or 404 (no users?)
    it('should return 500 on fail (cannot access database)', async () => {
      await getOrganizations();
      const res = await request(server)
        .get(ORGS_API_URL)
      expect(res.status).toEqual(500);
    })
  })

  describe('POST ROUTE /', () => {
    it('should return 201 on success', async () => {
      await insertOrganization();
      const res = await request(server)
        .post(ORGS_API_URL)
        //check this structure
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.status).toEqual(201);
    })
    it('should return the new Org on success', async () => {
      await insertOrganization();
      const res = await request(server)
        .post(ORGS_API_URL)
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.body).toEqual({ newOrganization });
    })
    it('should return 400 on fail (no org name)', async () => {
      await insertOrganization();
      const res = await request(server)
        .post(ORGS_API_URL)
        .send({
          name: '',
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.status).toEqual(400);
    })
    it('should return 500 on db access fail', async () => {
      await insertOrganization();
      const res = await request(server)
        .post(ORGS_API_URL)
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.status).toEqual(500);
    })
  })

  describe('GET ROUTE /:ID', () => {
    it('should return 200 on success', async () => {
      await getOrganizationById();
      const res = await request(server)
        .get(ORGS_API_URL + '/:id')
      expect(res.status).toEqual(200);
    })
    it('should return 404 on fail (org does not exist)', async () => {
      await getOrganizationById();
      const res = await request(server)
        .get(ORGS_API_URL + '/:id')
      expect(res.status).toEqual(404);
    })
  })
  
  describe('PUT ROUTE /:ID', () => {
  //similar to POSTs above
  //how to send ID info from req.params.id?
    it('should return 200 on success', async () => {
      await updateOrganization();
      const res = await request(server)
        .put(ORGS_API_URL + '/:id')
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.status).toEqual(200);
    })  
    it('should return the org on success', async () => {
      await updateOrganization();
      const res = await request(server)
        .put(ORGS_API_URL + '/:id')
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.body).toEqual({ organization });
    })
    //handle blank inputs
    it('should return 404 on fail (org not found)', async () => {
      await updateOrganization();
      const res = await request(server)
        .put(ORGS_API_URL + '/:id')
        .send({
          name: organization.name,
          logo: organization.logo,
          admin_id: 0,
        })
      expect(res.status).toEqual(404);
    }) 

    it('should return 200 on success', async () => {
      await deleteOrganization();
      const res = await request(server)
        .put(ORGS_API_URL + '/:id')
        .send({
          deleted: true
        })
        expect(res.status).toEqual(200);
    })
    it('should return 404 on fail (org not found)', async () => {
      await deleteOrganization();
      const res = await request(server)
        .put(ORGS_API_URL + '/:id')
        .send({
          deleted: true
        })
        expect(res.status).toEqual(404)
    })  
  })

  describe('DELETE ROUTE /:ID/REMOVE', () => {
    it('should return 204 on success', async () => {
      await removeOrganization();
      const res = await request(server)
        .delete(ORGS_API_URL + '/:id/remove')
        .send({
          deleted: true
        })
      expect(res.status).toEqual(204)
    })
    it('should return 404 on fail', async () => {
      await removeOrganization();
      const res = await request(server)
        .delete(ORGS_API_URL + '/:id/remove')
        .send({
          deleted: true
        })
      expect(res.status).toEqual(404)
    })
    it('should return 500 on database error', async () => {
      await removeOrganization();
      const res = await request(server)
        .delete(ORGS_API_URL + '/:id/remove')
        .send({
          deleted: true
        })
      expect(res.status).toEqual(500)
    })
  })
})