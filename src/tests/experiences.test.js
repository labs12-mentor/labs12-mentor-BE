const request = require("supertest");
const server = require("../server");
const Experiences = require("../database/helpers/experiences");
const Users = require("../database/helpers/users");
const Owners = require("../database/helpers/owners");
const Administrators = require("../database/helpers/administrators");

const EXPERIENCE_API_URL = "/api/experiences";

const samepleExperience = {
    name: "React",
    user_id: 1,
    deleted: false
}

afterEach(async () => {
    await Users.truncate();
    await Owners.truncate();
    await Administrators.truncate();
    await Mentees.truncate();
  });
  
  beforeEach(async () => {
    await Users.truncate();
    await Owners.truncate();
    await Administrators.truncate();
    await Experiences.truncate();
  });
  
  async function createUser() {
    return await request(server)
      .post(AUTH_API_URL + "/register")
      .send(user);
  }
  
  async function createOwner() {
    return await request(server)
      .post(AUTH_API_URL + "/owner/register")
      .send(owner);
  }
  
  async function createAdministrator() {
    return await request(server)
      .post(AUTH_API_URL + "/admin/register")
      .send(administrator);
  }
  
  async function createExperience() {
    return await request(server)
      .post(EXPERIENCE_API_URL)
      .send(sampleExperience);
  }

  describe("EXPERIENCES ROUTE", () => {
      describe("GET ROUTE /EXPERIENCES", () => {
          it("should return status 200 on success", async () => {
              await createExperience();

              const res = await request(server).get(EXPERIENCE_API_URL);

              expect(res.status).toEqual(200);
          })

          it("should return an empty array", async () => {

              const res = await request(server).get(EXPERIENCE_API_URL);

              expect(res.body).toHaveLength(0)
          })

          it("should return an array with length of 1", async () => {
              await createExperience();

              const res = await request(server).get(EXPERIENCE_API_URL);

              expect(res.body).toHaveLength(1);
          })
      });

      describe("POST ROUTE /EXPERIENCES", () => {
          it("should return status 201 on success", async () => {
            const res = await request(server)
            .post(EXPERIENCE_API_URL)
            .send(samepleExperience);

            expect(res.status).toEqual(201);
          })

          it("should return message on success", async () => {
            const res = await request(server)
            .post(EXPERIENCE_API_URL)
            .send(samepleExperience);

            expect(res.body).toEqual({message: "Experience has been added"})
          })

          it("should return status 400 on failure (no name) ", async () => {
            const res = await request(server)
            .post(EXPERIENCE_API_URL)
            .send({
              name: "",
              user_id: 1,
              deleted: false
            })

            expect(res.status).toEqual(400)
          })

          it("should return error on failure (no name)", async () => {
            const res = await request(server)
            .post(EXPERIENCE_API_URL)
            .send({
              name: "",
              user_id: 1,
              deleted: false
            });

            expect(res.body).toEqual({error: "Please provide a name"})
          })
      });

      describe("GET ROUTE /EXPERIENCES/:id", () => {
        it("should return status 200 on success", async () => {
          await createExperience();
          const res = await request(server).get(`${EXPERIENCE_API_URL}/1`);
          
          expect(res.status).toEqual(200)
        })

        it("should return an empty array", async () => {
          const res = await request(server).get(`${EXPERIENCE_API_URL}/1`);
  
          expect(res.body).toHaveLength(0);
        })
      })

      describe("PUT ROUTE /EXPERIENCES/:id", () => {
        it("should return status 200 on success", async () => {
          await createExperience();
          const res = await request(server)
            .put(EXPERIENCE_API_URL)
            .send({
              name: "Redux",
              user_id: 1,
              deleted: false
            });

            expect(res.status).toEqual(200)
        })

        it("should return message on success", async () => {
          await createExperience();
          const res = await request(server)
            .put(EXPERIENCE_API_URL)
            .send({
              name: "Redux",
              user_id: 1,
              deleted: false
            });

          expect(res.body).toEqual({message: "Your experience has been updated"})
        })

        it("should return status 400 on failure (without name)", async () => {
          await createExperience();
          
          const res = await request(server)
          .put(EXPERIENCE_API_URL)
          .send({
            name: "",
            user_id: 1,
            deleted: false
          })

          expect(res.status).toEqual(400)
        })

        it("should return error on failure (without name)", async () => {
          await createExperience();

          const res = await request(server)
          .put(EXPERIENCE_API_URL)
          .send({
            name:"",
            user_id: 1,
            deleted: false
          })

          expect(res.body).toEqual({error: "Please provide a name for your experience"})
        })
      })
  })