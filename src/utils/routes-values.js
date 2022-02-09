const USER_IMAGES_ROUTS = '/user-images';
const IMAGES_ROUTS_MAIN = '/images';
const USERS_ROUTS = '/users';
const AUTH_ROUTS = '/users';

module.exports.USER_IMAGES_ROUTS = {
  BASE_URL: USER_IMAGES_ROUTS,
  WITH_ID: USER_IMAGES_ROUTS + '/:id',
};
module.exports.IMAGES_ROUTS = {
  BASE_URL: IMAGES_ROUTS_MAIN,
  WITH_ID: IMAGES_ROUTS_MAIN + '/:id',
};
module.exports.USERS_ROUTS = {
  BASE_URL: USERS_ROUTS,
  WITH_ID: USERS_ROUTS + '/:id',
};
module.exports.AUTH_ROUTS = {
  BASE_URL: AUTH_ROUTS,
  SIGN_UP: AUTH_ROUTS + '/sign-up',
  LOGIN: AUTH_ROUTS + '/login',
  PASSWORD_CHANGING: AUTH_ROUTS + '/password-changing',
};
