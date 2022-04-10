const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError {
  constructor() {
    super("Not authorized to access this resource", StatusCodes.FORBIDDEN);
  }
}

module.exports = UnauthorizedError;
