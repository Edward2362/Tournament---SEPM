const { validateToken } = require("../utils/jwt");

const { UnauthenticatedError, UnauthorizedError } = require("../errors");

const authenticateUser = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError();
  }

  try {
    const { username, email, userId, role } = validateToken(token);
    req.user = { username, email, userId, role };
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
