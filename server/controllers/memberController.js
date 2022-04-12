const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Project = require("../models/Project");
const Member = require("../models/Member");

const generateSearchQuery = require("../utils/generateSearchQuery");

const { NotFoundError } = require("../errors");

const getALlMembers = async (req, res) => {
  const { role, desiredReward, sort, fields, page, limit } = req.query;

  const queryObject = {};

  const result = generateSearchQuery({
    queryObject,
    model: Member,
    objectAttributes: [
      { name: "role", value: role, type: "regex" },
      { name: "desiredReward", value: desiredReward, type: "regex" },
    ],
    sort,
    fields,
    page,
    limit,
  });

  const members = await result;

  res.status(StatusCodes.OK).json({ data: members });
};

const getUserMembers = async (req, res) => {
  const { userId } = req.user;
  const { role, desiredReward, sort, fields, page, limit } = req.query;

  const queryObject = { user: userId };

  const result = generateSearchQuery({
    queryObject,
    model: Member,
    objectAttributes: [
      { name: "role", value: role, type: "regex" },
      { name: "desiredReward", value: desiredReward, type: "regex" },
    ],
    sort,
    fields,
    page,
    limit,
  });

  const members = await result;

  res.status(StatusCodes.OK).json({ data: members });
};

const getProjectMembers = async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  const { role, desiredReward, sort, fields, page, limit } = req.query;

  const queryObject = { project: projectId };

  const result = generateSearchQuery({
    queryObject,
    model: Member,
    objectAttributes: [
      { name: "role", value: role, type: "regex" },
      { name: "desiredReward", value: desiredReward, type: "regex" },
    ],
    sort,
    fields,
    page,
    limit,
  });

  const members = await result;
  const isUserProject = members.some((m) => m.user.toString() === userId);
  if (!isUserProject) {
    throw new NotFoundError("Member");
  }

  res.status(StatusCodes.OK).json({ data: members });
};

const getSingleMember = async (req, res) => {
  const { userId } = req.user;
  const { id: memberId } = req.params;

  const member = await Member.findOne({
    _id: memberId,
    user: userId,
  });

  if (!member) {
    throw new NotFoundError("Member");
  }

  res.status(StatusCodes.OK).json({ data: member });
};

const createMember = async (req, res) => {
  const { projectId } = req.params;
  const { overallPoint, desiredReward, upperBoundary, lowerBoundary, userId } =
    req.body;

  // check for valid user
  const targetUser = await User.findOne({ _id: userId }).select("_id");
  if (!targetUser) {
    throw new NotFoundError("User");
  }

  // check for valid project
  const targetProject = await Project.findOne({ _id: projectId }).select("_id");
  if (!targetProject) {
    throw new NotFoundError("Project");
  }

  const member = await Member.create({
    overallPoint,
    desiredReward,
    upperBoundary,
    lowerBoundary,
    user: targetUser._id,
    project: targetProject._id,
  });

  res.status(StatusCodes.CREATED).json({ data: member });
};

const updateMember = async (req, res) => {
  const { userId } = req.user;
  const { id: memberId } = req.params;
  const { overallPoint, desiredReward, upperBoundary, lowerBoundary } =
    req.body;

  // TODO: project admin?
  const member = await Member.findOneAndUpdate(
    {
      _id: memberId,
      user: userId,
    },
    { overallPoint, desiredReward, upperBoundary, lowerBoundary },
    { new: true, runValidators: true }
  );

  if (!member) {
    throw new NotFoundError("Member");
  }

  res.status(StatusCodes.OK).json({ data: member });
};

const deleteMember = async (req, res) => {
  const { userId } = req.user;
  const { id: memberId } = req.params;

  const member = await Member.findOne({
    _id: memberId,
    user: userId,
  });
  if (!member) {
    throw new NotFoundError("Member");
  }

  await member.remove();

  res.status(StatusCodes.OK).json({ message: "Member deleted" });
};

module.exports = {
  getUserMembers,
  getSingleMember,
  getProjectMembers,
  createMember,
  updateMember,
  deleteMember,
  getALlMembers,
};
