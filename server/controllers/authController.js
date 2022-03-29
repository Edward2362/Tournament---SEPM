const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const validatePassword = require("../utils/validatePassword");
const { responseWithToken, createTokenPayload } = require("../utils/jwt");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // check if email is duplicated
  const isEmailDuplicated = await User.findOne({ email });
  if (isEmailDuplicated) {
    throw new Error("Email already exists");
  }

  // if this is the first account, make it an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  // create user
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  // add cookies to response
  const tokenUser = createTokenPayload(user);
  responseWithToken(res, tokenUser);

  res.status(StatusCodes.CREATED).json({ data: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check for bad request
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  // check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  // check if password matches
  const isPasswordMatch = await validatePassword({
    saved: user.password,
    toValidate: password,
  });
  if (!isPasswordMatch) {
    throw new Error("Invalid Credentials");
  }

  // add cookies to response
  const tokenUser = createTokenPayload(user);
  responseWithToken(res, tokenUser);

  res.status(StatusCodes.OK).json({ data: tokenUser });
};

module.exports = {
  register,
  login,
};
