var express = require('express');

var router = express.Router();
const { usersController } = require('../../controllers/index');
const routes = require('../../utils/routes-values').USERS_ROUTS;
const { asyncMiddleware } = require('../../utils/error-catcher');

router.post(
  routes.BASE_URL,
  asyncMiddleware(async (req, res) => {
    await usersController.createUser(req, res);
  }),
);
router.get(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    await usersController.getUsers(req, res, next);
  }),
);
router.get(
  routes.WITH_ID,
  asyncMiddleware(async (req, res, next) => {
    await usersController.getOneUser(req, res, next);
  }),
);
router.put(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    await usersController.updateUser(req, res);
  }),
);
router.delete(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    await usersController.deleteUser(req, res);
  }),
);

module.exports = router;
