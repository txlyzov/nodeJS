var express = require('express');
var router = express.Router();
const userController = require('../controllers/users-controller')

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET users listing. */
router.post('/users/create', async (req,res)=>{
    await userController.createUser(req,res);
})
router.get('/users', async (req,res)=>{
    await userController.getUsers(req,res);
})
router.get('/users/:id', async (req,res)=>{
    await userController.getOneUser(req,res);
})
router.put('/users/update/:id', async (req,res)=>{
    await userController.updateUser(req,res);
})
router.get('/users/delete/:id', async (req,res)=>{
    await userController.deleteUser(req,res);
})



module.exports = router;
