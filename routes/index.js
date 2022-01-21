const authorizationRouter = require('./authorization-router');
const usersRouter = require('./users-router');
const imagesRouter = require('./images-router');
const userImagesRouter = require('./user-images-router');

module.exports = {
  usersRouter,
  imagesRouter,
  authorizationRouter,
  userImagesRouter,
};
