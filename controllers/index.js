const authorizationController = require('./authorization-controller');
const usersController = require('./users-controller');
const imagesController = require('./images-controller');
const imagesControllerP = require('./images-controller-p');

module.exports = {
  usersController,
  imagesController,
  authorizationController,
  imagesControllerP,
};
