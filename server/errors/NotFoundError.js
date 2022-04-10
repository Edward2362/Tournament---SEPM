const { StatusCodes } = require("http-status-codes");
const BaseError = require("./BaseError");

class NotFoundError extends BaseError {
  constructor(object) {
    super(`${object || "Resource"} not found`, StatusCodes.NOT_FOUND);
  }
}

module.exports = NotFoundError;
