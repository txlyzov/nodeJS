const usersService = require('./public/users-service');
const imagesService = require('./public/images-service');
const authorizationService = require('./private/authorization-service');
const imagesPrivateService = require('./private/private-images-service');

module.exports = {
  usersService,
  imagesService,
  authorizationService,
  imagesPrivateService,
};
