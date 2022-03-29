const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Project = require("../models/Project");
const Membership = require("../models/Membership");

const getAllMemberships = async (req, res) => {
  const { userId } = req.user;

  const memberships = await Membership.find({ user: userId });
  res.status(StatusCodes.OK).json({ data: memberships });
};

const getSingleMembership = async (req, res) => {
  const { userId } = req.user;
  const { id: membershipId } = req.params;

  const membership = await Membership.findOne({
    _id: membershipId,
    user: userId,
  });

  if (!membership) {
    throw new Error("Membership not found");
  }

  res.status(StatusCodes.OK).json({ data: membership });
};

const createMembership = async (req, res) => {
  const {
    overallPoint,
    desiredReward,
    upperBoundary,
    lowerBoundary,
    userId,
    projectId,
  } = req.body;

  // check for valid user
  const targetUser = await User.findOne({ _id: userId });
  if (!targetUser) {
    throw new Error("User not found");
  }

  // check for valid project
  const targetProject = await Project.findOne({ _id: projectId });
  if (!targetProject) {
    throw new Error("Project not found");
  }

  const membership = await Membership.create({
    overallPoint,
    desiredReward,
    upperBoundary,
    lowerBoundary,
    user: targetUser._id,
    project: targetProject._id,
  });

  res.status(StatusCodes.CREATED).json({ data: membership });
};

const updateMembership = async (req, res) => {
  const { userId } = req.user;
  const { id: membershipId } = req.params;
  const { overallPoint, desiredReward, upperBoundary, lowerBoundary } =
    req.body;

  // TODO: project admin?
  const membership = await Membership.findOne({
    _id: membershipId,
    user: userId,
  });
  if (!membership) {
    throw new Error("Invalid Credentials");
  }

  membership.overallPoint = overallPoint || membership.overallPoint;
  membership.desiredReward = desiredReward || membership.desiredReward;
  membership.upperBoundary = upperBoundary || membership.upperBoundary;
  membership.lowerBoundary = lowerBoundary || membership.lowerBoundary;

  await membership.save();

  res.status(StatusCodes.OK).json({ data: membership });
};

const deleteMembership = async (req, res) => {
  const { userId } = req.user;
  const { id: membershipId } = req.params;

  const membership = await Membership.findOne({
    _id: membershipId,
    user: userId,
  });
  if (!membership) {
    throw new Error("Membership not found");
  }

  await membership.remove();

  res.status(StatusCodes.OK).json({ message: "Membership deleted" });
};

module.exports = {
  getAllMemberships,
  getSingleMembership,
  createMembership,
  updateMembership,
  deleteMembership,
};
