const usersService = require('./public/users-service');
const imagesService = require('./public/images-service');
const authorizationService = require('./private/authorization-service');
const userImagesService = require('./private/user-images-service');

module.exports = {
  usersService,
  imagesService,
  authorizationService,
  userImagesService,
};
