var express = require('express');

var router = express.Router();
const { imagesController } = require('../../controllers/index');
const routes = require('../../utils/routes-values').IMAGES_ROUTS;
const { asyncMiddleware } = require('../../utils/error-catcher');

router.post(
  routes.BASE_URL,
  asyncMiddleware(async (req, res) => {
    return imagesController.createImage(req, res);
  }),
);
router.get(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    return imagesController.getPublicImages(req, res, next);
  }),
);
router.put(
  routes.WITH_ID,
  asyncMiddleware(async (req, res) => {
    return imagesController.updateImage(req, res);
  }),
);

module.exports = router;
