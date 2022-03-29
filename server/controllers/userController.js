const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const { responseWithToken, createTokenPayload } = require("../utils/jwt");
const validatePassword = require("../utils/validatePassword");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password -role");
  res.status(StatusCodes.OK).json({ data: users });
};

const getCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: req.user });
};

const updateUser = async (req, res) => {
  const { userId } = req.user;
  const { email, username } = req.body;

  const user = await User.findOne({ _id: userId });

  user.email = email || user.email;
  user.username = username || user.username;

  await user.save();

  const tokenUser = createTokenPayload(user);
  responseWithToken(res, tokenUser);

  res.status(StatusCodes.OK).json({ data: tokenUser });
};

const updatePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("Please provide both old password and new password");
  }

  const user = await User.findOne({ _id: userId });

  const isPasswordMatch = await validatePassword({
    saved: user.password,
    toValidate: oldPassword,
  });
  if (!isPasswordMatch) {
    throw new Error("Invalid Credentials");
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ message: "Password updated!" });
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  await user.remove();

  res.status(StatusCodes.OK).json({ message: "User deleted" });
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  updatePassword,
  updateUser,
  deleteUser,
};
