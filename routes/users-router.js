var express = require('express');

var router = express.Router();
const usersController = require('../controllers/index').usersController;

router.post('/users/create', async (req, res, next) => {
  await usersController.createUser(req, res, next);
});
router.get('/users', async (req, res, next) => {
  await usersController.getUsers(req, res, next);
});
router.get('/users/:id', async (req, res, next) => {
  await usersController.getOneUser(req, res, next);
});
router.put('/users/update/:id', async (req, res, next) => {
  await usersController.updateUser(req, res, next);
});
router.delete('/users/delete/:id', async (req, res, next) => {
  await usersController.deleteUser(req, res, next);
});

module.exports = router;
