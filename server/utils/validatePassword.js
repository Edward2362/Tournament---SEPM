const bcrypt = require("bcryptjs");

const validatePassword = async function ({ saved, toValidate }) {
  return await bcrypt.compare(toValidate, saved);
};

module.exports = validatePassword;
