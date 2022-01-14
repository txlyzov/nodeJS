var express = require('express');

var router = express.Router();
const authorizationController =
  require('../controllers/index').authorizationController;
const asyncMiddleware = require('../utils/error-catcher').use;

router.post(
  '/users/sign-up',
  asyncMiddleware(async (req, res) => {
    await authorizationController.signUp(req, res);
  }),
);

router.post(
  '/users/login',
  asyncMiddleware(async (req, res) => {
    await authorizationController.login(req, res);
  }),
);

router.post(
  '/users/password-changing',
  asyncMiddleware(async (req, res) => {
    await authorizationController.changePassrod(req, res);
  }),
);

module.exports = router;
