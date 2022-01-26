const HSC = require('http-status-codes');
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
  async getUserImage(req, res, next) {
    const result = await imagesPrivateService.getUserImage(req);

    if (!result) return next();

    return res.json(result);
  },
  async updateUserImage(req, res) {
    const result = await imagesPrivateService.updateUserImage(req);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
