const imagesService = require('../public/images-service');

module.exports = {
  async addNewImage(req) {
    return imagesService.create({
      ...req.body,
    });
  },
  async getUserImages(req) {
    const userId = req.body.userId;

    return imagesService.getAllByUserId(userId);
  },
  async getUserImage(req) {
    const imageId = req.params.id;
    const userId = req.body.userId;

    return imagesService.getOneByIdAndUserId(imageId, userId);
  },
  async updateUserImage(req) {
    const body = req.body;
    const userId = body.userId;

    return imagesService.updateByIdAndUserId({ ...body, userId });
  },
};
