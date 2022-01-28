const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports.authMiddleware = () => {
  return (req, res, next) => {
    try {
      const user = jwt.verify(req.get('AuthToken'), JWT_SECRET);
      req.body = {
        ...req.body,
        userId: user.id,
      };
      next();
    } catch (e) {
      const error = new Error('message');
      error.code = '403';
      throw error;
    }
  };
};
