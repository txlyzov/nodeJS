var express = require('express');

var router = express.Router();
const usersController = require('../controllers/index').usersController;

router.post('/users/create', async (req, res) => {
  await usersController.createUser(req, res);
});
router.get('/users', async (req, res) => {
  await usersController.getUsers(req, res);
});
router.get('/users/:id', async (req, res) => {
  await usersController.getOneUser(req, res);
});
router.put('/users/update/:id', async (req, res) => {
  await usersController.updateUser(req, res);
});
router.delete('/users/delete/:id', async (req, res) => {
  await usersController.deleteUser(req, res);
});

module.exports = router;
