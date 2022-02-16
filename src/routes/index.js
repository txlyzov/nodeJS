const usersRouter = require('./public/users-routers');
const imagesRouter = require('./public/images-routers');
const authorizationRouter = require('./private/authorization-routers');
const userImagesRouter = require('./private/user-images-routers');

module.exports = {
  usersRouter,
  imagesRouter,
  authorizationRouter,
  userImagesRouter,
};
