var express = require('express');

var router = express.Router();
const imagesController = require('../controllers/index').imagesController;
const errorhandlerUse = require('../utils/error-catcher').use;

router.post(
  '/images/create',
  errorhandlerUse(async (req, res, next) => {
    await imagesController.createImage(req, res, next);
  }),
);
router.get(
  '/images',
  errorhandlerUse(async (req, res, next) => {
    await imagesController.getImages(req, res, next);
  }),
);
router.get(
  '/images/:id',
  errorhandlerUse(async (req, res, next) => {
    await imagesController.getOneImage(req, res, next);
  }),
);
router.put(
  '/images/update/:id',
  errorhandlerUse(async (req, res, next) => {
    await imagesController.updateImage(req, res, next);
  }),
);
router.delete(
  '/images/delete/:id',
  errorhandlerUse(async (req, res, next) => {
    await imagesController.deleteImage(req, res, next);
  }),
);

module.exports = router;
