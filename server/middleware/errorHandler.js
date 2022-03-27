const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Something went wrong, try again later" });
};

module.exports = errorHandler;
