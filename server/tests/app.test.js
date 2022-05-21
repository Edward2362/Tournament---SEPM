// server
const app = require("../app");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
// models
const User = require("../models/User");
const Project = require("../models/Project");
const Member = require("../models/Member");

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
    const projectsPromises = data.users.map((user) =>
      Project.create({
        name: "test project",
        trelloBoardId: "trello board id",
        lastAccessed: [{ user: user.userId }],
        admin: user.userId,
      })
    );

    const projects = await Promise.all(projectsPromises);

    const membersPromises = data.users.map((user, i) =>
      Member.create({
        user: user.userId,
        project: projects[i]._id,
      })
    );

    const members = await Promise.all(membersPromises);

    data.project = projects;
    data.member = members;
  } catch (error) {
    console.log(error);
  }
};

const expectMessage = () =>
  expect.objectContaining({
    message: expect.any(String),
  });

const expectAuth = () =>
  expect.objectContaining({
    data: expect.objectContaining({
      userId: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
      avatarUrl: expect.any(String),
      trelloId: expect.any(String),
      trelloToken: expect.any(String),
    }),
    token: expect.any(String),
  });

const expectUser = () =>
  expect.objectContaining({
    data: expect.objectContaining({
      userId: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      role: expect.any(String),
      avatarUrl: expect.any(String),
      trelloId: expect.any(String),
      trelloToken: expect.any(String),
    }),
  });

const expectProject = () =>
  expect.objectContaining({
    _id: expect.any(String),
    name: expect.any(String),
    upperBoundary: expect.any(Number),
    lowerBoundary: expect.any(Number),
    trelloBoardId: expect.any(String),
    finished: expect.any(Boolean),
    admin: expect.any(String),
    lastAccessed: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    __v: expect.any(Number),
  });

const expectMember = () =>
  expect.objectContaining({
    _id: expect.any(String),
    user: expect.any(String),
    project: expect.any(String),
    overallPoint: expect.any(Number),
    desiredReward: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    __v: expect.any(Number),
  });

describe("TEST /auth/register", () => {
  describe("Register with all properties", () => {
    it(`should be created`, async () => {
      const response = await request.post("/api/v1/auth/register").send({
        email: "testing@email.com",
        username: "username",
        password: "password",
      });

      expect(response.statusCode).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(expectAuth());
    });
  });

  describe("Register without any property", () => {
    it(`should be bad request`, async () => {
      const response = await request.post("/api/v1/auth/register").send({});

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual(expectMessage());
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
      expect(response.body).toEqual(expectMessage());
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
      expect(response.body).toEqual(expectAuth());
    });
  });

  describe("Login without registering", () => {
    it("should be unathorized", async () => {
      const response = await request.post("/api/v1/auth/login").send({
        email: "testing@email.com",
        password: "password",
      });

      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body).toEqual(expectMessage());
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
      expect(response.body).toEqual(expectMessage());
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
      expect(response.body).toEqual(expectUser());
    });
  });

  describe("Without token", () => {
    it("should be ok", async () => {
      const response = await request.get("/api/v1/users/me");

      expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(response.body).toEqual(expectMessage());
    });
  });
});

describe("TEST /projects", () => {
  let data = {};

  beforeEach(async () => await loginUser(data, 2));

  describe("Get all projects", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/users/me/projects")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([expectProject()]),
        })
      );
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
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expectProject(),
        })
      );
    });
  });

  describe("Create a project without body", () => {
    it("should be bad request", async () => {
      const response = await request
        .post("/api/v1/projects")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual(expectMessage());
    });
  });

  beforeEach(async () => await createProject(data));

  describe("Get a project", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/projects/" + data.project[0]._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expectProject(),
        })
      );
    });
  });

  describe("Get a project with wrong id", () => {
    it("should be not found", async () => {
      const response = await request
        .get("/api/v1/projects/" + "clearly-wrong-id")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Get a project of other user", () => {
    it("should be not found", async () => {
      const response = await request
        .get("/api/v1/projects/" + data.project[1]._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Update a project", () => {
    it("should be ok", async () => {
      const response = await request
        .patch("/api/v1/projects/" + data.project[0]._id)
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expectProject(),
        })
      );
    });
  });

  describe("Update a project being a member", () => {
    it("should be forbidden", async () => {
      await request
        .post(`/api/v1/projects/${data.project[0]._id.toString()}/members`)
        .send({
          userId: data.users[1].userId,
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      const response = await request
        .patch("/api/v1/projects/" + data.project[0]._id)
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[1].token);

      expect(response.statusCode).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Update a project with wrong id", () => {
    it("should be not found", async () => {
      const response = await request
        .patch("/api/v1/projects/" + "clearly-wrong-id")
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Delete a project", () => {
    it("should be ok", async () => {
      const response = await request
        .delete("/api/v1/projects/" + data.project[0]._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Delete a project being a member", () => {
    it("should be forbidden", async () => {
      await request
        .post(`/api/v1/projects/${data.project[0]._id.toString()}/members`)
        .send({
          userId: data.users[1].userId,
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      const response = await request
        .delete("/api/v1/projects/" + data.project[0]._id)
        .set("Authorization", "Bearer " + data.users[1].token);

      expect(response.statusCode).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Delete a project with wrong id", () => {
    it("should be not found", async () => {
      const response = await request
        .delete("/api/v1/projects/" + "clearly-wrong-id")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
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
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([expectMember()]),
        })
      );
    });
  });

  describe("Create a member", () => {
    it("should be created", async () => {
      const response = await request
        .post(`/api/v1/projects/${data.project[0]._id.toString()}/members`)
        .send({
          userId: data.users[1].userId,
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expectMember(),
        })
      );
    });
  });

  describe("Create a member with wrong project id", () => {
    it("should be not found", async () => {
      const response = await request
        .post(`/api/v1/projects/clearly-wrong-id/members`)
        .send({
          userId: data.users[1].userId,
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Create a member without body", () => {
    it("should be not found", async () => {
      const response = await request
        .post(`/api/v1/projects/${data.project[0]._id.toString()}/members`)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Get a member", () => {
    it("should be ok", async () => {
      const response = await request
        .get("/api/v1/members/" + data.member[0]._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expectMember(),
        })
      );
    });
  });

  describe("Get a member of other user", () => {
    it("should be not found", async () => {
      const response = await request
        .get("/api/v1/members/" + data.member[1]._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Get a member with wrong id", () => {
    it("should be not found", async () => {
      const response = await request
        .get("/api/v1/members/" + "clearly-wrong-id")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Update a member", () => {
    it("should be ok", async () => {
      const response = await request
        .patch("/api/v1/members/" + data.member[0]._id)
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          data: expectMember(),
        })
      );
    });
  });

  describe("Update a member with wrong id", () => {
    it("should be not found", async () => {
      const response = await request
        .patch("/api/v1/members/" + "clearly-wrong-id")
        .send({
          name: "project-update",
          trelloBoardId: "id",
        })
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Delete a member", () => {
    it("should be ok", async () => {
      const response = await request
        .delete("/api/v1/members/" + data.member[0]._id)
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.body).toEqual(expectMessage());
    });
  });

  describe("Delete a member with wrong id", () => {
    it("should be not found", async () => {
      const response = await request
        .delete("/api/v1/members/" + "clearly-wrong-id")
        .set("Authorization", "Bearer " + data.users[0].token);

      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual(expectMessage());
    });
  });
});
