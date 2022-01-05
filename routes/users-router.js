var express = require('express');

var router = express.Router();
const usersController = require('../controllers/index').usersController;
const asyncMiddleware = require('../utils/error-catcher').use;

router.post(
  '/users/create',
  asyncMiddleware(async (req, res, next) => {
    await usersController.createUser(req, res, next);
  }),
);
router.get(
  '/users',
  asyncMiddleware(async (req, res, next) => {
    await usersController.getUsers(req, res, next);
  }),
);
router.get(
  '/users/:id',
  asyncMiddleware(async (req, res, next) => {
    await usersController.getOneUser(req, res, next);
  }),
);
router.put(
  '/users/update/:id',
  asyncMiddleware(async (req, res, next) => {
    await usersController.updateUser(req, res, next);
  }),
);
router.delete(
  '/users/delete/:id',
  asyncMiddleware(async (req, res, next) => {
    await usersController.deleteUser(req, res, next);
  }),
);

module.exports = router;
