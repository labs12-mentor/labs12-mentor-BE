const request = require("supertest");
const server = require("../server");
const Mentees = require("../database/helpers/menteeProfiles");

const MENTEE_API_URL = "/api/menteeProfiles"

const sampleProfile = {
    user_id: 1,
    desired_zip: 11009,
    lambda_week: 5,
    interests: "basketball",
    application_answers: "yes",
    wanted_mentor_id: 6
}

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
    })
  });
});

