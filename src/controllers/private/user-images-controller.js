const imagesPrivateService =
  require('../../services/index').imagesPrivateService;

module.exports = {
  async addNewImage(req, res) {
    return res.json(await imagesPrivateService.addNewImage(req));
  },

  async getUserImages(req, res, next) {
    const result = await imagesPrivateService.getUserImages(req);

    if (!result.length) return next();

    return res.json(result);
  },
};
