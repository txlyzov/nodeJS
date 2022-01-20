const service = require('./services/images-service-p');

module.exports = {
  async getUserImages(req, res, next) {
    const result = await service.getUserImages(req);
    if (!result.length) return next();

    return res.json(result);
  },
};
