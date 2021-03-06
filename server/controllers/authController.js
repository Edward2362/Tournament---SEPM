const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");

const {
  responseWithToken,
  createTokenPayload,
  validatePassword,
  createToken,
} = require("../utils");

const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { username, email, password, trelloId, trelloToken, avatarUrl } =
    req.body;

  // email duplication checking is in errorhandler when request fails the unique validation

  // create user
  const user = await User.create({
    username,
    email,
    password,
    trelloId,
    trelloToken,
    avatarUrl,
  });

  // add cookies to response
  const tokenUser = createTokenPayload(user);
  const token = createToken(tokenUser);
  responseWithToken(res, token);

  res.status(StatusCodes.CREATED).json({ data: tokenUser, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check for bad request
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // check if email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError();
  }

  // check if password matches
  const isPasswordMatch = await validatePassword(user.password, password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError();
  }

  // add cookies to response
  const tokenUser = createTokenPayload(user);
  const token = createToken(tokenUser);
  responseWithToken(res, token);

  res.status(StatusCodes.OK).json({ data: tokenUser, token });
};

module.exports = {
  register,
  login,
};

module.exports.logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(StatusCodes.OK).json({ response: "Logged out" });
};
