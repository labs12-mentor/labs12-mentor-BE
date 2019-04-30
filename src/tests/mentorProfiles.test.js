const request = require("supertest");
const server = require("../server");
const Mentor = require("../database/helpers/mentorProfiles");
const Users = require("../database/helpers/users");
const Owners = require("../database/helpers/owners");
const Administrators = require("../database/helpers/administrators");


const AUTH_API_URL = "/api/auth";
const MENTOR_API_URL = "/api/mentorProfiles";

const sampleProfile = {
    user_id: 1,
    deleted:false 
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
    await Users.truncate();
    await Owners.truncate();
    await Administrators.truncate();
    await Mentors.truncate();
  });
  
  beforeEach(async () => {
    await Users.truncate();
    await Owners.truncate();
    await Administrators.truncate();
    await Mentors.truncate();
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
  
  async function createMentor() {
    return await request(server)
      .post(MENTOR_API_URL)
      .send(sampleProfile);
  }

  describe("MENTORS ROUTER", () => {
      describe("GET ROUTE/MENTORS", () => {
        it("should return status 200 on success", async () => {
            await createMentor();

            const res = await request(server).get(MENTOR_API_URL);

            expect(res.status).toEqual(200);
        });

        it("should return an empty array", async () => {
            const res = await request(server).get(MENTOR_API_URL);
            
            expect(res.body).toHaveLength(0);
        })
      })

      describe("POST ROUTE /MENTORS", () => {
          it("should return status 201 on success", async () => {
              const res = await request(server)
              .post(MENTOR_API_URL)
              .send(sampleProfile)

              expect(res.status).toEqual(201)
          })

          it("should return message on success", async () => {
              const res = await request(server)
              .post(MENTOR_API_URL)
              .send(sampleProfile);

              expect(res.body).toEqual({message: "Mentor's Profile created"})
          })

          it("should return status 400 on failure without user_id", async () => {
              const res = await request(server)
              .post(MENTOR_API_URL)
              .send({
                  user_id: null
              })

              expect(res.status).toEqual(400)
          })

          it("should return error on failure without user_id", async () => {
              const res = await request(server)
              .post(MENTOR_API_URL)
              .send({
                  user_id: null
              })

              expect(res.body).toEqual({error: "Need user id to make profile"})
          })

      })

      describe("GET ROUTE /MENTORS/:id", () => {
         it("should return 200 on success", async () => {
             await createMentor();
             const res = await request(server).get(`${MENTOR_API_URL}/1`)

             expect(res.status).toEqual(200);

         })
      })

      describe("PUT ROUTE /MENTORS/:id")

      describe("DELETE ROUTE /MENTORS/:id")

    //   describe("DELETE ROUTE /MENTORS/:id/REMOVE")
  })