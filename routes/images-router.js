var express = require('express');

var router = express.Router();
const imagesController = require('../controllers/index').imagesController;
const asyncMiddleware = require('../utils/error-catcher').use;

router.post(
  '/images',
  asyncMiddleware(async (req, res, next) => {
    await imagesController.createImage(req, res, next);
  }),
);
router.get(
  '/images',
  asyncMiddleware(async (req, res, next) => {
    await imagesController.getImages(req, res, next);
  }),
);
router.get(
  '/images/:id',
  asyncMiddleware(async (req, res, next) => {
    await imagesController.getOneImage(req, res, next);
  }),
);
router.put(
  '/images/:id',
  asyncMiddleware(async (req, res, next) => {
    await imagesController.updateImage(req, res, next);
  }),
);
router.delete(
  '/images/:id',
  asyncMiddleware(async (req, res, next) => {
    await imagesController.deleteImage(req, res, next);
  }),
);

module.exports = router;
