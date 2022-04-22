const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong, try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // duplicated errors
  if (err.code === 11000) {
    customError.message = `Duplicated ${Object.keys(
      err.keyValue
    )}, please choose another one`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // validation errors
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // id related errors
  if (err.name === "CastError") {
    if (err.kind === "ObjectId") {
      customError.message = `Resource with id ${err.value} not found`;
      customError.statusCode = StatusCodes.NOT_FOUND;
    } else {
      customError.message = `Wrong value type ${err.valueType} for ${err.path}, should be ${err.kind}`;
      customError.statusCode = StatusCodes.BAD_REQUEST;
    }
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandler;
