const jwt = require('jsonwebtoken');
const HSC = require('http-status-codes');
const createError = require('http-errors');
const { validationResult } = require('express-validator');
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

module.exports.validateMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      console.log(222);

      return next();
    }
    console.log(333);
  };
};
