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

const loginUser = async (data, quantity = 1) => {
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

const createProject = async (data) => {
  try {
    const project = await Project.create({
      name: "test project",
      trelloBoardId: "trello board id",
      lastAccessed: [{ user: data.users[0].userId }],
      admin: data.users[0].userId,
    });
    const member = await Member.create({
      user: data.users[0].userId,
      project: project._id,
    });

    data.project = project;
    data.member = member;
  } catch (error) {
    console.log(error);
  }
};

describe("TEST /auth/register", () => {
  describe("Register with all properties", () => {
    it(`should be created`, async () => {
      const response = await request.post("/api/v1/auth/register").send({
        email: "testing@email.com",
        username: "username",
        password: "password",
      });

      expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  describe("Register without any property", () => {
    it(`should be bad request`, async () => {
      const response = await request.post("/api/v1/auth/register").send({});

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });

  describe("Register with a registered email", () => {
    it(`should be bad request`, async () => {
      await User.create({
        email: "testing@email.com",
        username: "username",
        password: "password",
      });

      const response = await request.post("/api/v1/auth/register").send({
        email: "testing@email.com",
        username: "username",
        password: "password",
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
  });
});

describe("TEST /auth/login", () => {
  describe("Login with a registered email", () => {
    it("should be ok", async () => {
      await User.create({
        email: "testing@email.com",
        username: "username",
        password: "password",
      });

      const response = await request.post("/api/v1/auth/login").send({
        email: "testing@email.com",
        password: "password",
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Login without registering", () => {
    it("should be unathorized", async () => {
      const response = await request.post("/api/v1/auth/login").send({
        email: "testing@email.com",
        password: "password",
      });

      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe("Login with a wrong password", () => {
    it("should be unauthorized", async () => {
      await User.create({
        email: "testing@email.com",
        username: "username",
        password: "password",
      });

      const response = await request.post("/api/v1/auth/login").send({
        email: "testing@email.com",
        password: "wrong-password",
      });

      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });
});

describe("TEST /users/me", () => {
  let data = {};

  describe("With token", () => {
    it("should be ok", async () => {
      await loginUser(data);

      const response = await request
        .get("/api/v1/users/me")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Without token", () => {
    it("should be ok", async () => {
      const response = await request.get("/api/v1/users/me");

      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });
});

describe("TEST /projects", () => {
  let data = {};

  beforeEach(async () => await loginUser(data));

  describe("Get all projects", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/users/me/projects")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Create a project", () => {
    it("should be created", async () => {
      const response = await request
        .post("/api/v1/projects")
        .send({
          name: "project",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  beforeEach(async () => await createProject(data));

  describe("Get a project", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/projects/" + data.project._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Update a project", () => {
    it("should be ok", async () => {
      const response = await request
        .patch("/api/v1/projects/" + data.project._id)
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Delete a project", () => {
    it("should be ok", async () => {
      const response = await request
        .delete("/api/v1/projects/" + data.project._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });
});

describe("TEST /members", () => {
  let data = {};

  beforeEach(async () => {
    await loginUser(data, 2);
    await createProject(data);
  });

  describe("Get all members", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/users/me/members")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Create a member", () => {
    it("should be created", async () => {
      const response = await request
        .post(`/api/v1/projects/${data.project._id.toString()}/members`)
        .send({
          userId: data.users[1].userId,
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
  });

  describe("Get a member", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/members/" + data.member._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Update a member", () => {
    it("should be ok", async () => {
      const response = await request
        .patch("/api/v1/members/" + data.member._id)
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });

  describe("Delete a member", () => {
    it("should be ok", async () => {
      const response = await request
        .delete("/api/v1/members/" + data.member._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
    });
  });
});
