const HSC = require('http-status-codes');
const service = require('./services/images-service');

module.exports = {
  async createImage(req, res) {
    return res.json(await service.create(req.body));
  },
  async getPublicImages(req, res, next) {
    const result = await service.getPublic();
    if (!result.length) return next();

    return res.json(result);
  },
  async getOneImage(req, res, next) {
    const result = await service.getOne(req.params.id);
    if (!result) return next();

    return res.json(result);
  },
  async updateImage(req, res) {
    const result = await service.update(req.params.id, req.body);
    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
  async deleteImage(req, res) {
    const result = await service.delete(req.params.id);
    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
