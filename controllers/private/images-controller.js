const imagesPrivateService =
  require('../../services/index').imagesPrivateService;

module.exports = {
  async getUserImages(req, res, next) {
    const result = await imagesPrivateService.getUserImages(req);
    if (!result.length) return next();

    return res.json(result);
  },
};
