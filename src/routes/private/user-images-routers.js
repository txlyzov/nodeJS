var express = require('express');

var router = express.Router();
const { header } = require('express-validator');
const { userImagesController } = require('../../controllers/index');
const routes = require('../../utils/routes-values').USER_IMAGES_ROUTS;
const {
  asyncMiddleware,
  authMiddleware,
  validateMiddleware,
} = require('../../utils/error-catcher');

router.post(
  routes.BASE_URL,
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    return userImagesController.addNewImage(req, res, next);
  }),
);
router.get(
  routes.BASE_URL,
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    return userImagesController.getUserImages(req, res, next);
  }),
);

router.get(
  routes.WITH_ID,
  validateMiddleware([
    header('AuthToken').isLength({
      min: 699,
    }),
  ]),
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    return userImagesController.getUserImage(req, res, next);
  }),
);
router.put(
  routes.BASE_URL,
  authMiddleware,
  asyncMiddleware(async (req, res, next) => {
    return userImagesController.updateUserImage(req, res, next);
  }),
);
router.delete(
  routes.WITH_ID,
  authMiddleware,
  asyncMiddleware(async (req, res) => {
    return userImagesController.deleteUserImage(req, res);
  }),
);

module.exports = router;
