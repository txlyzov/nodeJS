const HSC = require('http-status-codes');
const userImagesService = require('../../services/index').userImagesService;

module.exports = {
  async addNewImage(req, res) {
    return res.json(await userImagesService.addNewImage(req));
  },

  async getUserImages(req, res, next) {
    const result = await userImagesService.getUserImages(req);

    if (!result.length) return next();

    return res.json(result);
  },
  async getUserImage(req, res, next) {
    const result = await userImagesService.getUserImage(req);

    if (!result) return next();

    return res.json(result);
  },
  async updateUserImage(req, res) {
    const result = await userImagesService.updateUserImage(req);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
