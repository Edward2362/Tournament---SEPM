const dayjs = require("dayjs");
const { StatusCodes } = require("http-status-codes");

const Project = require("../models/Project");
const Membership = require("../models/Membership");

const getAllProjects = async (req, res) => {
  const { userId } = req.user;
  const { name, sort, fields, page: pageQuery, limit: limitQuery } = req.query;

  const memberships = await Membership.find({ user: userId }).select("project");
  const membershipIDs = memberships.map((m) => m.project);

  const queryObject = { _id: { $in: membershipIDs } };

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let projects = Project.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    projects = projects.sort(sortList);
  } else {
    projects = projects.sort("-lastAccessed");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    projects = projects.select(fieldList);
  }

  // default on first page
  const page = parseInt(pageQuery) || 1;
  // default 10 items each page
  const limit = parseInt(limitQuery) || 10;
  const skip = (page - 1) * limit;

  projects = projects.skip(skip).limit(limit);

  projects = await projects;

  res.status(StatusCodes.OK).json({ data: projects });
};

const getSingleProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;

  const project = await Project.findOne({ user: userId, project: projectId });
  if (!project) {
    throw new Error("Project not found");
  }

  project.lastAccessed = dayjs().toDate();

  await project.save();

  res.status(StatusCodes.OK).json({ data: project });
};

const createProject = async (req, res) => {
  const { userId } = req.user;
  const { name, trelloBoardId } = req.body;

  const project = await Project.create({ name, trelloBoardId });
  // create the admin for the project
  await Membership.create({
    user: userId,
    project: project._id,
    role: "admin",
  });

  res.status(StatusCodes.CREATED).json({ data: project });
};

const updateProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;
  const { name, trelloBoardId } = req.body;

  // check for valid project
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new Error("Project not found");
  }

  // authorize user
  const membership = await Membership.findOne({
    project: projectId,
    user: userId,
    role: "admin",
  });
  if (!membership) {
    throw new Error("Invalid Credentials");
  }

  project.name = name || project.name;
  project.trelloBoardId = trelloBoardId || project.trelloBoardId;

  await project.save();

  res.status(StatusCodes.OK).json({ data: project });
};

const deleteProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;

  // check for valid project
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new Error("Project not found");
  }

  // authorize user
  const membership = await Membership.findOne({
    project: projectId,
    user: userId,
    role: "admin",
  });
  if (!membership) {
    throw new Error("Invalid Credentials");
  }

  await project.remove();

  res.status(StatusCodes.OK).json({ message: "Project deleted" });
};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
