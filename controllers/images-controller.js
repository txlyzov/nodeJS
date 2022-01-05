const service = require('./services/images-service');

module.exports = {
  async createImage(req, res, next) {
    return res.json(await service.create(req.body, next));
  },
  async getImages(req, res, next) {
    return res.json(await service.get(next));
  },
  async getOneImage(req, res, next) {
    return res.json(await service.getOne(req.params.id, next));
  },
  async updateImage(req, res, next) {
    return res.sendStatus(await service.update(req.params.id, req.body, next));
  },
  async deleteImage(req, res, next) {
    return res.sendStatus(await service.delete(req.params.id, next));
  },
};
