const jwt = require('jsonwebtoken');
const HSC = require('http-status-codes');
const createError = require('http-errors');
const { errorTexts } = require('./consts');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports.authMiddleware = (req, res, next) => {
  try {
    const user = jwt.verify(req.get('AuthToken'), JWT_SECRET);
    req.body = {
      ...req.body,
      userId: user.id,
    };
    next();
  } catch (e) {
    const error = createError(HSC.FORBIDDEN, errorTexts.AUTH_ERROR);
    throw error;
  }
};
