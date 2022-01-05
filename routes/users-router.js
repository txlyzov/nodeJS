var express = require('express');

var router = express.Router();
const usersController = require('../controllers/index').usersController;
const errorhandlerUse = require('../utils/error-catcher').use;

router.post(
  '/users/create',
  errorhandlerUse(async (req, res, next) => {
    await usersController.createUser(req, res, next);
  }),
);
router.get(
  '/users',
  errorhandlerUse(async (req, res, next) => {
    await usersController.getUsers(req, res, next);
  }),
);
router.get(
  '/users/:id',
  errorhandlerUse(async (req, res, next) => {
    await usersController.getOneUser(req, res, next);
  }),
);
router.put(
  '/users/update/:id',
  errorhandlerUse(async (req, res, next) => {
    await usersController.updateUser(req, res, next);
  }),
);
router.delete(
  '/users/delete/:id',
  errorhandlerUse(async (req, res, next) => {
    await usersController.deleteUser(req, res, next);
  }),
);

module.exports = router;
