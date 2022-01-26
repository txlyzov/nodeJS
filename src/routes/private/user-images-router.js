var express = require('express');

var router = express.Router();
const imagesPrivateController =
  require('../../controllers/index').imagesPrivateController;
const routes = require('../../utils/routes-values').USER_IMAGES_ROUTS;
const asyncMiddleware = require('../../utils/error-catcher').use;

router.post(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    await imagesPrivateController.addNewImage(req, res, next);
  }),
);

router.get(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    await imagesPrivateController.getUserImages(req, res, next);
  }),
);

module.exports = router;
