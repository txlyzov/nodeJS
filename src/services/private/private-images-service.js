const jwt = require('jsonwebtoken');
const imagesService = require('../public/images-service');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async addNewImage(req) {
    const user = jwt.verify(req.get('AuthToken'), JWT_SECRET);
    console.log({
      ...req.body,
      userId: user.id,
    });

    return imagesService.create({
      ...req.body,
      userId: user.id,
    });
  },
  async getUserImages(header) {
    const user = jwt.verify(header.get('AuthToken'), JWT_SECRET);

    return imagesService.getAllByUserId(user.id);
  },
  async getUserImage(req) {
    const imageId = req.params.id;
    const userId = jwt.verify(req.get('AuthToken'), JWT_SECRET).id;

    return imagesService.getOneByIdAndUserId(imageId, userId);
  },
  async updateUserImage(req) {
    const body = req.body;
    const userId = jwt.verify(req.get('AuthToken'), JWT_SECRET).id;

    return imagesService.updateByIdAndUserId({ ...body, userId });
  },
};
