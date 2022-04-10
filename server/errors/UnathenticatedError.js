const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");

class UnauthenticatedError extends BaseError {
  constructor() {
    super("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
}

module.exports = UnauthenticatedError;
