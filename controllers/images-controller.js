const HSC = require('http-status-codes');
const service = require('./services/images-service');

module.exports = {
  async createImage(req, res) {
    return res.json(await service.create(req.body));
  },
  async getImages(req, res, next) {
    return res.json(await service.get(next));
  },
  async getOneImage(req, res, next) {
    return res.json(await service.getOne(req.params.id, next));
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
