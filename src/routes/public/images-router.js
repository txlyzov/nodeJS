var express = require('express');

var router = express.Router();
const imagesController = require('../../controllers/index').imagesController;
const routes = require('../../utils/routes-values').IMAGES_ROUTS;
const asyncMiddleware = require('../../utils/error-catcher').asyncMiddleware;

router.post(
  routes.BASE_URL,
  asyncMiddleware(async (req, res) => {
    await imagesController.createImage(req, res);
  }),
);
router.get(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    await imagesController.getPublicImages(req, res, next);
  }),
);
router.put(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    await imagesController.updateImage(req, res);
  }),
);
router.delete(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    await imagesController.deleteImage(req, res);
  }),
);

module.exports = router;
