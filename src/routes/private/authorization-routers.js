const express = require('express');

const router = express.Router();
const { authorizationController } = require('../../controllers/index');
const routes = require('../../utils/routes-values').AUTH_ROUTS;
const { asyncMiddleware, validateMiddleware } = require('../../utils/error-catcher');

router.post(
  routes.SIGN_UP,
  validateMiddleware(),
  asyncMiddleware(async (req, res) => {
    console.log(req.body);
    return authorizationController.signUp(req, res);
  }),
);

router.post(
  routes.LOGIN,
  asyncMiddleware(async (req, res) => {
    return authorizationController.login(req, res);
  }),
);

router.post(
  routes.PASSWORD_CHANGING,
  asyncMiddleware(async (req, res) => {
    return authorizationController.changePassword(req, res);
  }),
);

module.exports = router;
