const dayjs = require("dayjs");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const generateSearchQuery = require("../utils/generateSearchQuery");
const { responseWithToken, createTokenPayload } = require("../utils/jwt");
const validatePassword = require("../utils/validatePassword");

const getAllUsers = async (req, res) => {
  const { username, email, sort, fields, page, limit } = req.query;

  const queryObject = {};

  const result = generateSearchQuery({
    queryObject,
    model: User,
    objectAttributes: [
      { name: "username", value: username, type: "regex" },
      { name: "email", value: email, type: "regex" },
    ],
    sort,
    fields,
    fieldsDefault: "-password -role -trelloId -trelloToken",
    page,
    limit,
  });

  const users = await result;

  res.status(StatusCodes.OK).json({ data: users });
};

const getSingleUser = async (req, res) => {
  const { id: studentId } = req.params;

  const user = await User.findOne({ _id: studentId }).select(
    "-password -role -trelloId -trelloToken"
  );

  res.status(StatusCodes.OK).json({ data: user });
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

  res.cookie("token", "", {
    httpOnly: true,
    expires: dayjs().toDate(),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(StatusCodes.OK).json({ message: "User deleted" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updatePassword,
  updateUser,
  deleteUser,
};
