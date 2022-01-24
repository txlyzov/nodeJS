const HSC = require('http-status-codes');
const imagesService = require('../../services/index').imagesService;

module.exports = {
  async createImage(req, res) {
    return res.json(await imagesService.create(req.body));
  },
  async getPublicImages(req, res, next) {
    const result = await imagesService.getPublic();

    if (!result.length) return next();

    return res.json(result);
  },
  async getOneImage(req, res, next) {
    const result = await imagesService.getOne(req.params.id);

    if (!result) return next();

    return res.json(result);
  },
  async updateImage(req, res) {
    const result = await imagesService.update(req.params.id, req.body);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
  async deleteImage(req, res) {
    const result = await imagesService.delete(req.params.id);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
