// run: node populate.js

require("dotenv").config();

const crypto = require("crypto");
const mongoose = require("mongoose");

const User = require("./models/User");
const Project = require("./models/Project");
const Member = require("./models/Member");

const userJson = require("./mockData/users.json");
const projectJson = require("./mockData/projects.json");
const memberJson = require("./mockData/members.json");

const startUserIndex = 1;
const maxUserIndex = 99;
const startProjectIndex = 0;
const maxProjectIndex = 199;

const main = async () => {
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

  const passed = {};

  memberJson.map((e) => {
    const projectIndex = crypto.randomInt(startProjectIndex, maxProjectIndex);
    let userIndex;
    do {
      // random again if user already in project
      userIndex = crypto.randomInt(startUserIndex, maxUserIndex);

      if (!(projectIndex in passed) || !(userIndex in passed[projectIndex])) {
        break;
      }
    } while (true);

    e.user = userIDs[userIndex];
    e.project = projectIDs[projectIndex];

    // if there is no one in the project, make the person admin
    if (projectIndex in passed) {
      e.role = "member";
    } else {
      e.role = "admin";
    }

    // put user in project
    passed[projectIndex] = { ...passed[projectIndex], [userIndex]: true };
    return e;
  });

  await Member.create(memberJson);
};

main();
