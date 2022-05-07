require("dotenv").config();
// server
const app = require("./app");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
// models
const User = require("./models/User");
const Project = require("./models/Project");
const Member = require("./models/Member");

// test
const request = require("supertest")(app);

beforeAll(async () => await mongoose.connect(process.env.MONGO_URL_TEST));
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
afterAll(() => mongoose.connection.close());

const shouldRespondWith =
  (statusCode, ...requests) =>
  () => {
    it(`Should respond with ${statusCode}`, async () => {
      const mainRequest = requests.pop();

      for (const request of requests) await request();

      const response = await mainRequest();
      expect(response.statusCode).toBe(statusCode);
    });
  };

const loginUser =
  (data, quantity = 1) =>
  async () => {
    try {
      if (quantity < 1) {
        return;
      }
      const usersPromises = [];
      for (let i = 0; i < quantity; i++) {
        usersPromises.push(
          User.create({
            email: `testing${i}@email.com`,
            username: "username",
            password: "password",
          })
        );
      }

      await Promise.all(usersPromises);

      const loginsPromises = [];
      for (let i = 0; i < quantity; i++) {
        loginsPromises.push(
          request
            .post("/api/v1/auth/login")
            .send({ email: `testing${i}@email.com`, password: "password" })
        );
      }

      const responses = await Promise.all(loginsPromises);

      const users = responses.map((response) => {
        expect(response.statusCode).toBe(StatusCodes.OK);
        return {
          ...response.body.data,
          token: response.body.token,
        };
      });

      data.users = users;
    } catch (error) {
      console.log(error);
    }
  };

const createProject = (data) => async () => {
  try {
    const project = await Project.create({
      name: "test project",
      trelloBoardId: "trello board id",
      lastAccessed: [{ user: data.users[0].userId }],
    });
    const member = await Member.create({
      user: data.users[0].userId,
      project: project._id,
      role: "admin",
    });

    data.project = project;
    data.member = member;
  } catch (error) {
    console.log(error);
  }
};

describe("TEST /auth/register", () => {
  describe(
    "Register with all properties",
    shouldRespondWith(StatusCodes.CREATED, async () =>
      request.post("/api/v1/auth/register").send({
        email: "testing@email.com",
        username: "username",
        password: "password",
      })
    )
  );

  describe(
    "Register without any property",
    shouldRespondWith(StatusCodes.BAD_REQUEST, async () =>
      request.post("/api/v1/auth/register").send({})
    )
  );

  describe(
    "Register with a registered email",
    shouldRespondWith(
      StatusCodes.BAD_REQUEST,
      async () =>
        User.create({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
      async () =>
        request.post("/api/v1/auth/register").send({
          email: "testing@email.com",
          username: "username",
          password: "password",
        })
    )
  );
});

describe("TEST /auth/login", () => {
  describe(
    "Login with a registered email",
    shouldRespondWith(
      StatusCodes.OK,
      async () =>
        User.create({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
      async () =>
        request.post("/api/v1/auth/login").send({
          email: "testing@email.com",
          password: "password",
        })
    )
  );

  describe(
    "Login without registering",
    shouldRespondWith(StatusCodes.UNAUTHORIZED, async () =>
      request.post("/api/v1/auth/login").send({
        email: "testing@email.com",
        password: "password",
      })
    )
  );

  describe(
    "Login with a wrong password",
    shouldRespondWith(
      StatusCodes.UNAUTHORIZED,
      async () =>
        User.create({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
      async () =>
        request.post("/api/v1/auth/login").send({
          email: "testing@email.com",
          password: "wrong-password",
        })
    )
  );
});

describe("TEST /users/me", () => {
  let data = {};

  describe(
    "With token",
    shouldRespondWith(StatusCodes.OK, loginUser(data), async () =>
      request
        .get("/api/v1/users/me")
        .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Without token",
    shouldRespondWith(StatusCodes.UNAUTHORIZED, async () =>
      request.get("/api/v1/users/me")
    )
  );
});

describe("TEST /projects", () => {
  let data = {};

  describe(
    "Get all projects",
    shouldRespondWith(StatusCodes.OK, loginUser(data), async () =>
      request
        .get("/api/v1/users/me/projects")
        .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Create a project",
    shouldRespondWith(StatusCodes.CREATED, loginUser(data), async () =>
      request
        .post("/api/v1/projects")
        .send({
          name: "project",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Get a project",
    shouldRespondWith(
      StatusCodes.OK,
      loginUser(data),
      createProject(data),
      async () =>
        request
          .get("/api/v1/projects/" + data.project._id)
          .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Update a project",
    shouldRespondWith(
      StatusCodes.OK,
      loginUser(data),
      createProject(data),
      async () =>
        request
          .patch("/api/v1/projects/" + data.project._id)
          .send({
            name: "project-update",
            trelloBoardId: "id",
          })
          .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Delete a project",
    shouldRespondWith(
      StatusCodes.OK,
      loginUser(data),
      createProject(data),
      async () =>
        request
          .delete("/api/v1/projects/" + data.project._id)
          .set("Authorization", "Bearer " + data.users[0].token)
    )
  );
});

describe("TEST /members", () => {
  let data = {};

  describe(
    "Get all members",
    shouldRespondWith(StatusCodes.OK, loginUser(data), async () =>
      request
        .get("/api/v1/users/me/members")
        .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Create a member",
    shouldRespondWith(
      StatusCodes.CREATED,
      loginUser(data, 2),
      createProject(data),
      async () => {
        return await request
          .post(`/api/v1/projects/${data.project._id.toString()}/members`)
          .send({
            userId: data.users[1].userId,
          })
          .set("Authorization", "Bearer " + data.users[0].token);
      }
    )
  );

  describe(
    "Get a member",
    shouldRespondWith(
      StatusCodes.OK,
      loginUser(data),
      createProject(data),
      async () =>
        request
          .get("/api/v1/members/" + data.member._id)
          .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Update a member",
    shouldRespondWith(
      StatusCodes.OK,
      loginUser(data),
      createProject(data),
      async () =>
        request
          .patch("/api/v1/members/" + data.member._id)
          .send({
            name: "project-update",
            trelloBoardId: "id",
          })
          .set("Authorization", "Bearer " + data.users[0].token)
    )
  );

  describe(
    "Delete a member",
    shouldRespondWith(
      StatusCodes.OK,
      loginUser(data),
      createProject(data),
      async () =>
        request
          .delete("/api/v1/members/" + data.member._id)
          .set("Authorization", "Bearer " + data.users[0].token)
    )
  );
});
