const jwt = require('jsonwebtoken');
const imagesService = require('./images-service');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async getUserImages(header) {
    const user = jwt.verify(header.get('AuthToken'), JWT_SECRET);
    const result = await imagesService.getAllByUserId(user.id);

    return result;
  },
};
