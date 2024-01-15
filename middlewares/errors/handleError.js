const constants = require('../../utils/constants');

function handleError(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? constants.errorMessages.serverError : err.message;
  res.status(statusCode).send({ message });
  next();
}

module.exports = { handleError };
