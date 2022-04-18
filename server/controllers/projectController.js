const { StatusCodes } = require("http-status-codes");

const Project = require("../models/Project");
const Member = require("../models/Member");

const { generateSearchQuery } = require("../utils");

const { NotFoundError } = require("../errors");

const getAllProjects = async (req, res) => {
  const { name, sort, fields, page, limit } = req.query;

  const queryObject = {};

  const result = generateSearchQuery(Project, queryObject, {
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

  const result = generateSearchQuery(Project, queryObject, {
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

  // authorize user
  await Member.findUserIsMember(userId, projectId);

  // check for valid project
  const project = await Project.findOneExist({ _id: projectId });

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

  // authorize user
  await Member.findUserIsAdmin(userId, projectId);

  // update project
  const project = await Project.findOneAndUpdate(
    { _id: projectId },
    { name, trelloBoardId, finished },
    { new: true, runValidators: true }
  );
  if (!project) {
    throw new NotFoundError("Project");
  }

  res.status(StatusCodes.OK).json({ data: project });
};

const deleteProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;

  // authorize user
  await Member.findUserIsAdmin(userId, projectId);

  // check for valid project
  const project = await Project.findOneExist({ _id: projectId });
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
