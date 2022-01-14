var express = require('express');

var router = express.Router();
const usersController = require('../controllers/index').usersController;
const asyncMiddleware = require('../utils/error-catcher').use;

router.post(
  '/users',
  asyncMiddleware(async (req, res) => {
    await usersController.createUser(req, res);
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
  '/users/:id',
  asyncMiddleware(async (req, res) => {
    await usersController.updateUser(req, res);
  }),
);
router.delete(
  '/users/:id',
  asyncMiddleware(async (req, res) => {
    await usersController.deleteUser(req, res);
  }),
);

module.exports = router;
