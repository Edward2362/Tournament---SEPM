require("dotenv").config();
const dayjs = require("dayjs");

const time1 = dayjs();

const mongoose = require("mongoose");

const User = require("./models/User");
const Project = require("./models/Project");
const Membership = require("./models/Membership");

const userJson = require("./mockData/users.json");
const projectJson = require("./mockData/projects.json");
const membershipJson = require("./mockData/memberships.json");

const populateUser = async () => {
  await User.deleteMany({});
  await User.create(userJson);
};

const populateProject = async () => {
  await Project.deleteMany({});
  await Project.create(projectJson);
};

const populateMembership = async () => {
  const users = await User.find({}).select("_id");
  const userIDs = users.map((e) => e._id.toString());

  const projects = await Project.find({}).select("_id");
  const projectIDs = projects.map((e) => e._id.toString());

  membershipJson.map((e) => {
    e.user = userIDs[e.user];
    e.project = projectIDs[e.project];
    return e;
  });

  await Membership.deleteMany({});
  await Membership.create(membershipJson);
};

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await populateUser();
    await populateProject();
    await populateMembership();

    const time2 = dayjs();
    const diff = time2.diff(time1, "second");
    console.log("Done. " + diff + " seconds");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
