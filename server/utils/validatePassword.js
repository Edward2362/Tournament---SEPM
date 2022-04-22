const bcrypt = require("bcryptjs");

/**
 * Validate password using compare method of bcrypt
 * @param {string} saved saved/hashed password
 * @param {string} toValidate password to be validated
 * @returns
 */
const validatePassword = async function (saved, toValidate) {
  return await bcrypt.compare(toValidate, saved);
};

module.exports = validatePassword;
