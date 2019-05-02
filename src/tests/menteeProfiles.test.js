const request = require("supertest");
const server = require("../server");
const Mentees = require("../database/helpers/menteeProfiles");
const Users = require("../database/helpers/users");
const Owners = require("../database/helpers/owners");
const Administrators = require("../database/helpers/administrators");


const AUTH_API_URL = "/api/auth";
const MENTEE_API_URL = "/api/menteeProfiles";

const sampleProfile = {
  user_id: 1,
  desired_zip: 11009,
  lambda_week: 5,
  interests: "basketball",
  application_answers: "yes",
  wanted_mentor_id: 6
};

const owner = {
  username: "user",
  password: "password",
  email: "email@example.org",
  company_name: "Lambda School"
};

const administrator = {
  username: "user",
  password: "password",
  first_name: "John",
  last_name: "Doe",
  email: "email@example.org",
  company_name: "Lambda School"
};

const user = {
  username: "user",
  password: "password",
  first_name: "John",
  last_name: "Doe",
  email: "email@example.org",
  country: "United States",
  state: "CA",
  city: "San Francisco",
  zipcode: "94131",
  role_id: 0,
  organization_id: 0
};

afterEach(async () => {
  await db('menteeprofiles').del();
  await db.raw('ALTER SEQUENCE menteeprofiles_id_seq RESTART WITH 1');
  await db('users').del();
  await db.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await db('organizations').del();
  await db.raw('ALTER SEQUENCE organizations_id_seq RESTART WITH 1');
  await db('administrators').del();
  await db.raw('ALTER SEQUENCE administrators_id_seq RESTART WITH 1');
});

beforeEach(async () => {
  await db('menteeprofiles').del();
  await db.raw('ALTER SEQUENCE menteeprofiles_id_seq RESTART WITH 1');
  await db('users').del();
  await db.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  await db('organizations').del();
  await db.raw('ALTER SEQUENCE organizations_id_seq RESTART WITH 1');
  await db('administrators').del();
  await db.raw('ALTER SEQUENCE administrators_id_seq RESTART WITH 1');
});

async function createUser() {
  return await request(server)
    .post(AUTH_API_URL + "/register")
    .send(user);
}

async function createAdministrator() {
  return await request(server)
    .post(AUTH_API_URL + "/admin/register")
    .send(administrator);
}

async function createMentee() {
  return await request(server)
    .post(MENTEE_API_URL)
    .send(sampleProfile);
}

describe("MENTEES ROUTER", () => {
  describe("GET ROUTE /MENTEES", () => {
    it("should return status 200 on success", async () => {
      createAdministrator();

      await createMentee();
      const res = await request(server).get(MENTEE_API_URL);
      expect(res.status).toEqual(200);
    });

    it("should return an empty array", async () => {
      const res = await request(server).get(MENTEE_API_URL);
      expect(res.body).toHaveLength(0);
    });

    it("should return an array with length of 1", async () => {
      await createMentee();
      const res = await request(server).get(MENTEE_API_URL);
      expect(res.body).toHaveLength(1);
    });
  });

  describe("POST ROUTE/MENTEES", () => {
    it("should return status 201 on success", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send(sampleProfile);

      expect(res.status).toEqual(201);
    });

    it("should return status 201 without interests", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: 11009,
          lambda_week: 5,
          interests: "",
          application_answers: "yes",
          wanted_mentor_id: 6
        });
      expect(res.status).toEqual(201);
    });

    it("should return status 201 without desired zip", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: null,
          lambda_week: 5,
          interests: "bball",
          application_answers: "yes",
          wanted_mentor_id: 6
        });
      expect(res.status).toEqual(201);
    });

    it("should return status 201 without application answers", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: 12132,
          lambda_week: 5,
          interests: "bball",
          application_answers: "",
          wanted_mentor_id: 6
        });
      expect(res.status).toEqual(201);
    });

    it("should return message on success", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: null,
          lambda_week: 5,
          interests: "bball",
          application_answers: "yes",
          wanted_mentor_id: 6
        });
      expect(res.body).toEqual({ message: "Mentee profile has been created" });
    });

    it("should return message on success without interests", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: 12345,
          lambda_week: 5,
          interests: "",
          application_answers: "yes",
          wanted_mentor_id: 6
        });
      expect(res.body).toEqual({ message: "Mentee profile has been created" });
    });

    it("should return message on success without desired zip", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: null,
          lambda_week: 5,
          interests: "bball",
          application_answers: "yes",
          wanted_mentor_id: 6
        });
      expect(res.body).toEqual({ message: "Mentee profile has been created" });
    });

    it("should return message on success without application answers", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: 12134,
          lambda_week: 5,
          interests: "bball",
          application_answers: "",
          wanted_mentor_id: 6
        });
      expect(res.body).toEqual({ message: "Mentee profile has been created" });
    });

    it("should return status 404 on fail without lambda_week", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: 12134,
          lambda_week: null,
          interests: "bball",
          application_answers: "hey",
          wanted_mentor_id: 6
        });
      expect(res.status).toEqual(404);
    });

    it("should return error on fail without lambda week", async () => {
      const res = await request(server)
        .post(MENTEE_API_URL)
        .send({
          user_id: 1,
          desired_zip: 12134,
          lambda_week: 5,
          interests: "bball",
          application_answers: "",
          wanted_mentor_id: 6
        });
      expect(res.body).toEqual({ error: "Please provide the required fields" });
    });
  });

  describe("GET ROUTE /MENTEES/:id", () => {
    it("should return status 200 on success", async () => {
      await createMentee();

      const res = await request(server).get(`${MENTEE_API_URL}/1`);

      expect(res.status).toEqual(200);
    });

    it("should return specified mentee", async () => {
      await createMentee();

      const res = await request(server).get(`${MENTEE_API_URL}/1`);

      expect(res.body).toEqual({
        id: 1,
        user_id: 1,
        desired_zip: 11009,
        lambda_week: 5,
        interests: "basketball",
        application_answers: "yes",
        wanted_mentor_id: 6
      });
    });

    it("should return status 404 if no such meeting", async () => {
      const res = await request(server).get(`${MENTEE_API_URL}/1`);

      expect(res.status).toEqual(404);
    });

    it("should return error if no such meeting", async () => {
      const res = await request(server).get(`${MENTEE_API_URL}/1`);

      expect(res.body).toEqual({ error: "Your mentee does not exist" });
    });
  });

  describe("PUT ROUTE /MENTEES/:id", () => {
    it("should return 200 on success", async () => {
      await createMentee();

      const res = await request(server)
        .put(`${MENTEE_API_URL}/1`)
        .send({
          user_id: 1,
          desired_zip: 11109,
          lambda_week: 7,
          interests: "football",
          application_answers: "yes",
          wanted_mentor_id: 7
        });

      expect(res.status).toEqual(200);
    });

    it("should return message on success", async () => {
      await createMentee();

      const res = await request(server)
        .put(`${MENTEE_API_URL}/1`)
        .send({
          user_id: 1,
          desired_zip: 11109,
          lambda_week: 7,
          interests: "football",
          application_answers: "yes",
          wanted_mentor_id: 7
        });

      expect(res.body).toEqual({ message: "Profile has been updated" });
    });
  });

  describe("DELETE /MENTEES/:id", () => {
    it("should return status 200 on success", async () => {
      await createMentee();
      const res = await request(server).delete(`${MENTEE_API_URL}/1`);

      expect(res.status).toEqual(200);
    });

    it("should return message on success", async () => {
      await createMentee();
      const res = await request(server).delete(`${MENTEE_API_URL}/1`);

      expect(res.body).toEqual({ message: " The profile has been deleted" });
    });
  });

  //   describe("DELETE ROUTE /MEETINGS/:id/REMOVE", async () => {
  //       it("should return status 200 on success", () => {

  //       } )
  //   })
});
