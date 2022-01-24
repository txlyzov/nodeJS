const usersController = require('./public/users-controller');
const imagesController = require('./public/images-controller');
const authorizationController = require('./private/authorization-controller');
const imagesPrivateController = require('./private/private-images-controller');

module.exports = {
  usersController,
  imagesController,
  authorizationController,
  imagesPrivateController,
};