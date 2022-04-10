const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");

class BadRequestError extends BaseError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

module.exports = BadRequestError;
