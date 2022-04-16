const User = require("../models/User");

const { validateToken, createTokenPayload } = require("../utils");

const { UnauthenticatedError, UnauthorizedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError();
  }

  try {
    const { userId } = validateToken(token);

    const user = await User.findOneExist({ _id: userId });

    req.user = { ...createTokenPayload(user), user };
    next();
  } catch (error) {
    throw new UnauthenticatedError();
  }
};

const authorizeUser = (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new UnauthorizedError();
  }

  next();
};

module.exports = { authenticateUser, authorizeUser };
