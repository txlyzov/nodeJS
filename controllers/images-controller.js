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
    return res.sendStatus(await service.update(req.params.id, req.body));
  },
  async deleteImage(req, res) {
    return res.sendStatus(await service.delete(req.params.id));
  },
};
