const usersRouter = require('./public/users-router');
const imagesRouter = require('./public/images-router');
const authorizationRouter = require('./private/authorization-router');
const userImagesRouter = require('./private/user-images-router');

module.exports = {
  usersRouter,
  imagesRouter,
  authorizationRouter,
  userImagesRouter,
};
