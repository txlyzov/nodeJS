var express = require('express');

var router = express.Router();
const imagesController = require('../controllers/index').imagesController;

router.post('/images/create', async (req, res, next) => {
  await imagesController.createImage(req, res, next);
});
router.get('/images', async (req, res, next) => {
  await imagesController.getImages(req, res, next);
});
router.get('/images/:id', async (req, res, next) => {
  await imagesController.getOneImage(req, res, next);
});
router.put('/images/update/:id', async (req, res, next) => {
  await imagesController.updateImage(req, res, next);
});
router.delete('/images/delete/:id', async (req, res, next) => {
  await imagesController.deleteImage(req, res, next);
});

module.exports = router;
