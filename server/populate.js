// run: node populate.js

require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/User");
const Project = require("./models/Project");
const Member = require("./models/Member");

const userJson = require("./mockData/users.json");
const projectJson = require("./mockData/projects.json");
const memberJson = require("./mockData/members.json");

const deleteUsers = async () => {
  await User.deleteMany({});
};

const createUsers = async () => {
  await User.create(userJson);
};

const deleteProjects = async () => {
  await Project.deleteMany({});
};

const createProjects = async () => {
  await Project.create(projectJson);
};

const deleteMembers = async () => {
  await Member.deleteMany({});
};

const createMembers = async () => {
  const users = await User.find({}).select("_id");
  const userIDs = users.map((e) => e._id.toString());

  const projects = await Project.find({}).select("_id");
  const projectIDs = projects.map((e) => e._id.toString());

  memberJson.map((e) => {
    e.user = userIDs[e.user];
    e.project = projectIDs[e.project];
    return e;
  });

  await Member.create(memberJson);
};

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await deleteUsers();
    await deleteProjects();
    await deleteMembers();

    if (process.argv[2] !== "delete") {
      await createUsers();
      await createProjects();
      await createMembers();
    }

    console.log("Done.");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
