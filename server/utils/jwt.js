const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

/**
 * Return user object with selected fields
 * @param {User} user user object from mongo
 * @returns user object
 */
const createTokenPayload = (user) => {
  return {
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatar,
  };
};

/**
 * Return a jwt token
 * @param {User} user
 * @returns jwt token
 */
const createToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

/**
 * Validate existing token
 * @param {string} token
 * @returns
 */
const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Create and attach token to the response object
 * @param {Response} res response object from express
 * @param {User} user user object from mongo
 */
const responseWithToken = (res, user) => {
  const token = createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    expires: dayjs().add(30, "day").toDate(),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createToken,
  validateToken,
  responseWithToken,
  createTokenPayload,
};
