var express = require('express');

var router = express.Router();
const imagesPrivateController =
  require('../controllers/index').imagesControllerP;
const routes = require('../utils/routes-values').USER_IMAGES_ROUTS;
const asyncMiddleware = require('../utils/error-catcher').use;

router.get(
  routes.BASE_URL,
  asyncMiddleware(async (req, res, next) => {
    await imagesPrivateController.getUserImages(req, res, next);
  }),
);

module.exports = router;
