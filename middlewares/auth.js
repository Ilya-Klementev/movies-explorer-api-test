require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'secret' } = process.env;
const UnauthorizedError = require('./errors/UnauthorizedError');
const constants = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.replace('Bearer ', ''));
  if (!token) {
    return next(new UnauthorizedError(constants.errorMessages.requiredAuthorization));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(constants.errorMessages.requiredAuthorization));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
