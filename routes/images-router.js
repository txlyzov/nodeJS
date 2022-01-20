var express = require('express');

var router = express.Router();
const imagesController = require('../controllers/index').imagesController;
const imagesControllerP = require('../controllers/index').imagesControllerP;
const asyncMiddleware = require('../utils/error-catcher').use;

router.post(
  '/images',
  asyncMiddleware(async (req, res) => {
    await imagesController.createImage(req, res);
  }),
);
router.get(
  '/images/all',
  asyncMiddleware(async (req, res, next) => {
    await imagesController.getPublicImages(req, res, next);
  }),
);
router.get(
  '/images/user',
  asyncMiddleware(async (req, res, next) => {
    await imagesControllerP.getUserImages(req, res, next);
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
  asyncMiddleware(async (req, res) => {
    await imagesController.updateImage(req, res);
  }),
);
router.delete(
  '/images/:id',
  asyncMiddleware(async (req, res) => {
    await imagesController.deleteImage(req, res);
  }),
);

module.exports = router;
