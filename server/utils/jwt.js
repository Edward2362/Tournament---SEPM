const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const createToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const validateToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

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
};
