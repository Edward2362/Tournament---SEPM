const User = require("../models/User");

const { validateToken, createTokenPayload } = require("../utils");

const { UnauthenticatedError, UnauthorizedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;
  const authHeader = req?.headers.authorization;

  if (!token && (!authHeader || !authHeader.startsWith("Bearer "))) {
    throw new UnauthenticatedError();
  }

  let toValidate;

  if (token) {
    toValidate = token;
  } else {
    toValidate = authHeader.split(" ")[1];
  }

  try {
    const { userId } = validateToken(toValidate);

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
