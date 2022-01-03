var express = require('express');
var router = express.Router();
const imagesController = require('../controllers/images-controller')

router.post('/images/create', async (req,res)=>{
    await imagesController.createImage(req,res);
})
router.get('/images', async (req,res)=>{
    await imagesController.getImages(req,res);
})
router.get('/images/:id', async (req,res)=>{
    await imagesController.getOneImage(req,res);
})
router.put('/images/update/:id', async (req,res)=>{
    await imagesController.updateImage(req,res);
})
router.delete('/images/delete/:id', async (req,res)=>{
    await imagesController.deleteImage(req,res);
})

module.exports = router;
