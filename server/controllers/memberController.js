const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Member = require("../models/Member");

const { generateSearchQuery } = require("../utils");

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

  await Member.findUserIsMember(userId, projectId);

  const members = await Member.find({ project: projectId });

  res.status(StatusCodes.OK).json({ data: members });
};

const getSingleMember = async (req, res) => {
  const { userId } = req.user;
  const { id: memberId } = req.params;

  const member = await Member.findOneExist({
    _id: memberId,
    user: userId,
  });

  res.status(StatusCodes.OK).json({ data: member });
};

const createMember = async (req, res) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  const {
    overallPoint,
    desiredReward,
    upperBoundary,
    lowerBoundary,
    userId: userIdBody,
  } = req.body;

  await User.findOneExist({ _id: userIdBody });

  await Member.findUserIsAdmin(userId, projectId);

  const member = await Member.create({
    overallPoint,
    desiredReward,
    upperBoundary,
    lowerBoundary,
    user: userIdBody,
    project: projectId,
  });

  res.status(StatusCodes.CREATED).json({ data: member });
};

const updateMember = async (req, res) => {
  const { userId } = req.user;
  const { id: memberId } = req.params;
  const { overallPoint, desiredReward, upperBoundary, lowerBoundary } =
    req.body;

  // ? project admin
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

  const member = await Member.findOneExist({
    _id: memberId,
    user: userId,
  });

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
