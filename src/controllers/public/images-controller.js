const HSC = require('http-status-codes');
const { imagesService } = require('../../services/index');

module.exports = {
  async createImage(req, res) {
    return res.json(await imagesService.create(req));
  },
  async getPublicImages(req, res, next) {
    const result = await imagesService.getPublic();

    if (!result.length) return next();

    return res.json(result);
  },
  async getPublicImagesPagination(req, res, next) {
    const result = await imagesService.getPublicPagination(req);

    if (result.count === 0) return next();

    return res.json({
      meta: { count: result.count },
      data: { rows: result.rows },
    });
  },
  async updateImage(req, res) {
    const result = await imagesService.update(req);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
