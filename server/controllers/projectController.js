const dayjs = require("dayjs");
const { StatusCodes } = require("http-status-codes");

const Project = require("../models/Project");
const Member = require("../models/Member");

const generateSearchQuery = require("../utils/generateSearchQuery");

const { NotFoundError } = require("../errors");

const getAllProjects = async (req, res) => {
  const { name, sort, fields, page, limit } = req.query;

  const queryObject = {};

  const result = generateSearchQuery({
    queryObject,
    model: Project,
    objectAttributes: [{ name: "name", value: name, type: "regex" }],
    sort,
    fields,
    page,
    limit,
  });

  const projects = await result;

  res.status(StatusCodes.OK).json({ data: projects });
};

const getUserProjects = async (req, res) => {
  const { userId } = req.user;
  const { name, sort, fields, page, limit } = req.query;

  const members = await Member.find({ user: userId }).select("project");
  const memberIDs = members.map((m) => m.project);

  const queryObject = { _id: { $in: memberIDs } };

  const result = generateSearchQuery({
    queryObject,
    model: Project,
    objectAttributes: [{ name: "name", value: name, type: "regex" }],
    sort,
    fields,
    page,
    limit,
  });

  const projects = await result;

  res.status(StatusCodes.OK).json({ data: projects });
};

const getSingleProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;

  // check for valid project
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError("Project");
  }

  // authorize user
  const member = await Member.findOne({
    project: projectId,
    user: userId,
  });
  if (!member) {
    throw new NotFoundError("Project");
  }

  await project.save();

  res.status(StatusCodes.OK).json({ data: project });
};

const createProject = async (req, res) => {
  const { userId } = req.user;
  const { name, trelloBoardId } = req.body;

  const project = await Project.create({ name, trelloBoardId });
  // create the admin for the project
  await Member.create({
    user: userId,
    project: project._id,
    role: "admin",
  });

  res.status(StatusCodes.CREATED).json({ data: project });
};

const updateProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;
  const { name, trelloBoardId, finished } = req.body;

  // check for valid project
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError("Project");
  }

  // authorize user
  const member = await Member.findOne({
    project: projectId,
    user: userId,
    role: "admin",
  });
  if (!member) {
    throw new NotFoundError("Project");
  }

  project.name = name || project.name;
  project.trelloBoardId = trelloBoardId || project.trelloBoardId;
  project.finished = finished || project.finished;

  await project.save();

  res.status(StatusCodes.OK).json({ data: project });
};

const deleteProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;

  // check for valid project
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError("Project");
  }

  // authorize user
  const member = await Member.findOne({
    project: projectId,
    user: userId,
    role: "admin",
  });
  if (!member) {
    throw new NotFoundError("Project");
  }

  await project.remove();

  res.status(StatusCodes.OK).json({ message: "Project deleted" });
};

module.exports = {
  getUserProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
};
