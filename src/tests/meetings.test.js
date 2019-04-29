const request = require("supertest");
const server = require("../server");
const Meetings = require("../database/helpers/meetings");

const MEETING_API_URL = "/api/meetings";

const sampleMeeting = {
  match_id: 1,
  meeting_date: "2016-02-05T03:30:17.883Z",
  location: "Hong Kong",
  notes: "some meeting",
  rating: Math.floor(Math.random() * 5)
};

afterEach(async () => {
  await Meetings.truncate();
});

beforeEach(async () => {
  await Meetings.truncate();
});

async function createMeeting() {
  return await request(server)
    .post(MEETING_API_URL)
    .send(sampleMeeting);
}

describe("MEETINGS ROUTER", () => {
  describe("GET ROUTE /MEETINGS", () => {
    it("should return status 200 on success", async () => {
      const res = await request(server).get(MEETING_API_URL);
      expect(res.status).toEqual(200);
    });

    it("should return an empty array", async () => {
      const res = await request(server).get(MEETING_API_URL);
      expect(res.body).toHaveLength(0);
    });
    
  });

  describe("POST ROUTE /MEETINGS", () => {
    it("should return status 201 on success", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.status).toEqual(201);
    });

    it("should return status 201 on success (without notes)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.status).toEqual(201);
    });

    it("should return status 201 on success (without rating)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "some meeting",
          rating: ""
        });
      expect(res.status).toEqual(201);
    });

    it("should return status 201 on success (without notes and rating)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "",
          rating: ""
        });
      expect(res.status).toEqual(201);
    });

    it("should return a message on success", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.body).toEqual({ message: "Meeting has been created" });
    });

    it("should return a message on success (without notes)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.body).toEqual({ message: "Meeting has been created" });
    });

    it("should return a message on success (without rating)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "some meeting",
          rating: null
        });
      expect(res.body).toEqual({ message: "Meeting has been created" });
    });

    it("should return a message on success (without notes and ratings", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "",
          rating: null
        });
      expect(res.body).toEqual({ message: "Meeting has been created" });
    });

    it("should return status 400 on fail (no match id)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: null,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.status).toEqual(400);
    });

    it("should return status 400 on fail (no meeting date)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "",
          location: "New York",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.status).toEqual(400);
    });

    it("should return status 400 on fail (no location)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.status).toEqual(400);
    });

    it("should return error on fail (no match id)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: null,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.body).toEqual({
        error: "Please fill out the required fields"
      });
    });

    it("should return error on fail (no meeting date)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "",
          location: "New York",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.body).toEqual({
        error: "Please fill out the required fields"
      });
    });

    it("should return error on fail (no location)", async () => {
      const res = await request(server)
        .post(MEETING_API_URL)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "",
          notes: "some meeting",
          rating: Math.floor(Math.random() * 5)
        });
      expect(res.body).toEqual({
        error: "Please fill out the required fields"
      });
    });
  });

  describe("GET ROUTE /MEETINGS/:id", () => {
    it("should return status 200 on success", async () => {
      await createMeeting();
      const res = await request(server).get(`${MEETING_API_URL}/1`);
      expect(res.status).toEqual(200);
    });

    it("should return specified meeting", async () => {
      await createMeeting();
      const res = await request(server).get(`${MEETING_API_URL}/1`);
      expect(res.body).toEqual({ id: 1, ...sampleMeeting });
    });

    it("should return status 404 if no such meeting", async () => {
        const res = await request(server).get(`${MEETING_API_URL}/1`);
        expect(res.status).toEqual(404);
      });

      it("should return error if no such meeting", async () => {
        const res = await request(server).get(`${MEETING_API_URL}/1`);
        expect(res.body).toEqual({error: "Your meeting does not exist."});
      });
  });

  describe("PUT ROUTE /MEETINGS/:id", () => {
    it("should return status 200 on success", async () => {
      await createMeeting();

      const res = await request(server)
        .put(`${MEETING_API_URL}/1`)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York --- MANHATTAN",
          notes: "some cool meeting",
          rating: Math.floor(Math.random() * 5)
        });

      expect(res.status).toEqual(200);
    });

    it("should return message on success", async () => {
      await createMeeting();

      const res = await request(server)
        .put(`${MEETING_API_URL}/1`)
        .send({
          match_id: 1,
          meeting_date: "2016-02-05T03:30:17.883Z",
          location: "New York --- MANHATTAN",
          notes: "some cool meeting",
          rating: Math.floor(Math.random() * 5)
        });

      expect(res.body).toEqual({ message: "Your meeting has been updated" });
    });

  });

  describe("DELETE ROUTE /MEETINGS/:id", async () => {
      it("should return status 200 on success", () => {
          await createMeeting();
          const res = await request(server).delete(`${MEETING_API_URL}/1`)
          expect(res.status).toEqual(200)
      })

      it("should return message on success", () => {
        await createMeeting();
        const res = await request(server).delete(`${MEETING_API_URL}/1`)
        expect(res.body).toEqual({message: 'Your meeting has been deleted'});
    })
  });

//   describe("DELETE ROUTE /MEETINGS/:id/REMOVE", async () => {
//       it("should return status 200 on success", () => {

//       } )
//   })
});
