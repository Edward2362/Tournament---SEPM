const { validateToken } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new Error("Invalid Credentials");
  }

  try {
    const { username, email, userId } = validateToken(token);
    req.user = { username, email, userId };
    next();
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};

module.exports = authenticateUser;
