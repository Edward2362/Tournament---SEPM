const { validateToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new Error("Invalid Credentials");
  }

  try {
    const { username, email, userId, role } = validateToken(token);
    req.user = { username, email, userId, role };
    next();
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};

const authorizeUser = (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new Error("Invalid Credentials");
  }

  next();
};

module.exports = { authenticateUser, authorizeUser };
