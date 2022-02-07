const imagesService = require('../public/images-service');

module.exports = {
  /**
   * Creates new record for image in Images table.
   * @param {Request} req Entitry for getting body with url, name, description, isPrivate, userId.
   * @returns {Object} Returns the responce with new created Image object.
   **/
  async addNewImage(req) {
    return imagesService.create({
      ...req.body,
    });
  },

  /**
   * Gets all Image object records in the Images table with one owner.
   * @param {Request} req Entitry for getting body with userId.
   * @returns {Array|Object} Returns the responce with all Image objects from the Images table.
   **/
  async getUserImages(req) {
    const userId = req.body.userId;

    return imagesService.getAllByUserId(userId);
  },

  /**
   * Gets one Image object record by id in the Images table.
   * @param {Request} req Entitry for getting body with imageId and userId.
   * @returns {Object} Returns the responce with one Image object from the Images table.
   **/
  async getUserImage(req) {
    const imageId = req.params.id;
    const userId = req.body.userId;

    return imagesService.getOneByIdAndUserId(imageId, userId);
  },

  /**
   * Update Image object record in the Images table.
   * @param {Request} req Entitry for getting body with userId.
   * @returns {Number} Returns the responce with updated Image object from the Images table.
   **/
  async updateUserImage(req) {
    const body = req.body;

    return imagesService.updateByIdAndUserId(body);
  },

  /**
   * Delete Image object record by Id in the Images table.
   * @param {Request} req Entitry for getting body with userId.
   * @returns {Number} Returns the responce with number 1 on success and 0 on fail.
   **/
  async deleteUserImage(req) {
    const imageId = req.params.id;
    const userId = req.body.userId;

    return imagesService.deleteByIdAndUserId(imageId, userId);
  },
};
