const jwt = require('jsonwebtoken');
const imagesService = require('../public/images-service');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async getUserImages(header) {
    const user = jwt.verify(header.get('AuthToken'), JWT_SECRET);

    return imagesService.getAllByUserId(user.id);
  },
};
