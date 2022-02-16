var express = require('express');

var router = express.Router();
const { usersController } = require('../../controllers/index');
const routes = require('../../utils/routes-values').USERS_ROUTS;
const { asyncMiddleware } = require('../../utils/error-catcher');

router.post(
  routes.BASE_URL,
  asyncMiddleware(async (req, res) => {
    return usersController.createUser(req, res);
  }),
);
router.get(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    return usersController.getUsers(req, res, next);
  }),
);
router.get(
  routes.WITH_ID,
  asyncMiddleware(async (req, res, next) => {
    return usersController.getOneUser(req, res, next);
  }),
);
router.put(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    return usersController.updateUser(req, res);
  }),
);
router.delete(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    return usersController.deleteUser(req, res);
  }),
);

module.exports = router;
