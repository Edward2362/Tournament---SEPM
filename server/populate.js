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

const memberMap = {};

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    createMemberMap();

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

const createMemberMap = () => {
  memberJson.forEach(() => {
    const projectIndex = crypto.randomInt(startProjectIndex, maxProjectIndex);

    let userIndex;
    do {
      // random again if user already in project
      userIndex = crypto.randomInt(startUserIndex, maxUserIndex);
    } while (
      memberMap[projectIndex] &&
      memberMap[projectIndex].includes(userIndex)
    );

    if (!memberMap[projectIndex]) {
      memberMap[projectIndex] = [];
    }

    memberMap[projectIndex].push(userIndex);
  });
};

const deleteUsers = async () => {
  await User.deleteMany({});
};
const deleteProjects = async () => {
  await Project.deleteMany({});
};
const deleteMembers = async () => {
  await Member.deleteMany({});
};

const createUsers = async () => {
  await User.create(userJson);
};

const createProjects = async () => {
  const users = await User.find({}).select("_id");
  const userIDs = users.map((e) => e._id.toString());

  projectJson.map((p, i) => {
    if (i in memberMap) {
      p.lastAccessed = memberMap[i].map((m) => ({ user: userIDs[m] }));
    }
  });

  await Project.create(projectJson);
};

const createMembers = async () => {
  const projects = await Project.find({}).select("_id lastAccessed");

  const memberLength = memberJson.length;

  let index = 0;
  for (const p of projects) {
    for (const [i, la] of p.lastAccessed.entries()) {
      if (index > memberLength) break;
      memberJson[index].user = la.user;
      memberJson[index].project = p._id;
      memberJson[index].role = i === 0 ? "admin" : "member";
      index++;
    }
  }

  await Member.create(memberJson);
};

main();
