const { StatusCodes } = require("http-status-codes");

const Project = require("../models/Project");
const Member = require("../models/Member");

const { createQueryObject, chainSF } = require("../utils");

const { NotFoundError } = require("../errors");
const dayjs = require("dayjs");

const getAllProjects = async (req, res) => {
  const { name, sort, fields, page, limit } = req.query;

  const queryObject = createQueryObject({}, [
    { name: "name", value: name, type: "regex" },
  ]);

  let projects = Project.find(queryObject);

  projects = chainSF(projects, {
    sort,
    fields,
    page,
    limit,
  });

  projects = await projects;

  res.status(StatusCodes.OK).json({ data: projects });
};

const getUserProjects = async (req, res) => {
  const { userId } = req.user;
  const { name, sort, fields, page, limit } = req.query;

  const queryObject = createQueryObject({ "lastAccessed.user": userId }, [
    { name: "name", value: name, type: "regex" },
  ]);

  let projects = Project.aggregate()
    .unwind("lastAccessed")
    .match(queryObject)
    .addFields({ lastAccessed: "$lastAccessed.date" });

  projects = chainSF(projects, {
    sort,
    fields,
    page,
    limit,
  });

  projects = await projects;

  projects = await Project.populate(projects, "members");

  res.status(StatusCodes.OK).json({ data: projects });
};

const getSingleProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;

  // authorize user
  await Member.findUserIsMember(userId, projectId);

  // update date of current user
  const project = await Project.findOneAndUpdate(
    { _id: projectId, "lastAccessed.user": userId },
    {
      $set: {
        "lastAccessed.$.date": dayjs().toDate(),
      },
    },
    { new: true, runValidators: true }
  );

  if (!project) {
    throw new NotFoundError();
  }

  // take only value of the current user
  const result = project.toObject();
  result.lastAccessed = result.lastAccessed.find(
    (e) => e.user.toString() === userId.toString()
  ).date;

  res.status(StatusCodes.OK).json({ data: result });
};

const createProject = async (req, res) => {
  const { userId } = req.user;
  const { name, trelloBoardId } = req.body;

  const project = await Project.create({
    name,
    trelloBoardId,
    admin: userId,
    lastAccessed: [{ user: userId }],
  });
  // create the admin for the project
  await Member.create({
    user: userId,
    project: project._id,
  });

  const result = project.toObject();
  result.lastAccessed = result.lastAccessed.find(
    (e) => e.user.toString() === userId.toString()
  ).date;

  res.status(StatusCodes.CREATED).json({ data: result });
};

const updateProject = async (req, res) => {
  const { userId } = req.user;
  const { id: projectId } = req.params;
  const { name, trelloBoardId, finished, upperBoundary, lowerBoundary } =
    req.body;

  // authorize user
  await Member.findUserIsAdmin(userId, projectId);

  // update project
  const project = await Project.findOneAndUpdate(
    { _id: projectId },
    { name, trelloBoardId, finished, upperBoundary, lowerBoundary },
    { new: true, runValidators: true }
  );
  if (!project) {
    throw new NotFoundError("Project");
  }

  const result = project.toObject();
  result.lastAccessed = result.lastAccessed.find(
    (e) => e.user.toString() === userId.toString()
  ).date;

  res.status(StatusCodes.OK).json({ data: result });
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
