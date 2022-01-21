const express = require('express');

const router = express.Router();
const authorizationController =
  require('../controllers/index').authorizationController;
const routes = require('../utils/routes-values').AUTH_ROUTS;
const asyncMiddleware = require('../utils/error-catcher').use;

router.post(
  routes.SIGN_UP,
  asyncMiddleware(async (req, res) => {
    await authorizationController.signUp(req, res);
  }),
);

router.post(
  routes.LOGIN,
  asyncMiddleware(async (req, res) => {
    await authorizationController.login(req, res);
  }),
);

router.post(
  routes.PASSWORD_CHANGING,
  asyncMiddleware(async (req, res) => {
    await authorizationController.changePassword(req, res);
  }),
);

module.exports = router;
