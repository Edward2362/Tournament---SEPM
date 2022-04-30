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
const request = require("supertest");

beforeAll(async () => await mongoose.connect(process.env.MONGO_URL_TEST));
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
afterAll(() => mongoose.connection.close());

const testBody =
  ({ statusCode, request, setup }) =>
  () => {
    test(`Should respond with ${statusCode}`, async () => {
      if (setup) await setup();
      const response = await request();
      expect(response.statusCode).toBe(statusCode);
    });
  };

describe("TEST /auth/register", () => {
  describe(
    "Register with all properties",
    testBody({
      statusCode: StatusCodes.CREATED,
      request: async () =>
        request(app).post("/api/v1/auth/register").send({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
    })
  );

  describe(
    "Register without providing email",
    testBody({
      statusCode: StatusCodes.BAD_REQUEST,
      request: async () =>
        request(app).post("/api/v1/auth/register").send({
          username: "username",
          password: "password",
        }),
    })
  );

  describe(
    "Register without providing password",
    testBody({
      statusCode: StatusCodes.BAD_REQUEST,
      request: async () =>
        request(app).post("/api/v1/auth/register").send({
          email: "testing@email.com",
          username: "username",
        }),
    })
  );

  describe(
    "Register without providing username",
    testBody({
      statusCode: StatusCodes.BAD_REQUEST,
      request: async () =>
        request(app).post("/api/v1/auth/register").send({
          email: "testing@email.com",
          password: "password",
        }),
    })
  );

  describe(
    "Register with the registered email",
    testBody({
      statusCode: StatusCodes.BAD_REQUEST,
      request: async () =>
        request(app).post("/api/v1/auth/register").send({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
      setup: async () =>
        User.create({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
    })
  );
});

describe("TEST /auth/login", () => {
  describe(
    "Login with the registered email",
    testBody({
      statusCode: StatusCodes.OK,
      request: async () =>
        request(app).post("/api/v1/auth/login").send({
          email: "testing@email.com",
          password: "password",
        }),
      setup: async () =>
        User.create({
          email: "testing@email.com",
          username: "username",
          password: "password",
        }),
    })
  );

  describe(
    "Login with a not-registered email",
    testBody({
      statusCode: StatusCodes.UNAUTHORIZED,
      request: async () =>
        request(app).post("/api/v1/auth/login").send({
          email: "testing@email.com",
          password: "password",
        }),
    })
  );
});
