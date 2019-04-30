const request = require("supertest");
const server = require("../server");
const Mentees = require("../database/helpers/menteeProfiles");

const MENTEE_API_URL = "/api/menteeProfiles";

const sampleProfile = {
  user_id: 1,
  desired_zip: 11009,
  lambda_week: 5,
  interests: "basketball",
  application_answers: "yes",
  wanted_mentor_id: 6
};

afterEach(async () => {
  await Mentees.truncate();
});

beforeEach(async () => {
  await Mentees.truncate();
});

async function createMentee() {
  return await request(server)
    .post(MENTEE_API_URL)
    .send(sampleProfile);
}

describe("MENTEES ROUTER", () => {
  describe("GET ROUTE /MENTEES", () => {
    it("should return status 200 on success", async () => {
      await createMentee();
      const res = await request(server).get(MEETING_API_URL);
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
    })

    it("should return specified meeting", () => {
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
    })
  })
});
