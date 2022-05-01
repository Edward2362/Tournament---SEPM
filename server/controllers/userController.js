const dayjs = require("dayjs");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const {
  responseWithToken,
  createTokenPayload,
  validatePassword,
  chainSF,
  createQueryObject,
  createToken,
} = require("../utils");

const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const getAllUsers = async (req, res) => {
  const { username, email, sort, fields, page, limit } = req.query;

  const queryObject = createQueryObject({}, [
    { name: "username", value: username, type: "regex" },
    { name: "email", value: email, type: "regex" },
  ]);

  let users = User.find(queryObject);

  users = chainSF(users, {
    sort,
    fields,
    fieldsDefault: "-password -role -trelloId -trelloToken",
    page,
    limit,
  });

  users = await users;

  res.status(StatusCodes.OK).json({ data: users });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId }).select(
    "-password -role -trelloId -trelloToken"
  );

  if (!user) {
    throw new NotFoundError("User");
  }

  res.status(StatusCodes.OK).json({ data: user });
};

const getCurrentUser = async (req, res) => {
  const { user } = req.user;
  const tokenUser = createTokenPayload(user);
  res.status(StatusCodes.OK).json({ data: tokenUser });
};

const updateUser = async (req, res) => {
  const { user } = req.user;
  const { email, username } = req.body;

  user.email = email || user.email;
  user.username = username || user.username;

  await user.save();

  const tokenUser = createTokenPayload(user);
  const token = createToken(tokenUser);
  responseWithToken(res, token);

  res.status(StatusCodes.OK).json({ data: tokenUser });
};

const updatePassword = async (req, res) => {
  const { user } = req.user;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError(
      "Please provide both old password and new password"
    );
  }

  const isPasswordMatch = await validatePassword({
    saved: user.password,
    toValidate: oldPassword,
  });
  if (!isPasswordMatch) {
    throw new UnauthenticatedError();
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ message: "Password updated!" });
};

const deleteUser = async (req, res) => {
  const { user } = req.user;

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
