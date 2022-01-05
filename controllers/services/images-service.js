const HSC = require('http-status-codes');
const imagesModel = require('../../models').images;

module.exports = {
  /**
   * Creates Image object record in Images table.
   * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Object} Returns the responce with new created Image object.
   **/
  async create(body, next) {
    try {
      const { url, name, description, isPrivate, userId } = body;
      const image = await imagesModel.create({
        url,
        name,
        description,
        isPrivate,
        userId,
      });

      return image;
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Gets all Image object records in the Images table.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Array|Object}} Returns the responce with all Image objects from the Images table.
   **/
  async get(next) {
    try {
      const images = await imagesModel.findAll();
      if (!images) return next();

      return images;
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Gets one Image object record by id in the Images table.
   * @param {Integer} id Image id from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Object} Returns the responce with one Image object from the Images table.
   **/
  async getOne(id, next) {
    try {
      const image = await imagesModel.findOne({
        where: {
          id,
        },
      });
      if (!image) return next();

      return image;
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Update Image object record in the Images table.
   * @param {Integer} id Image id from request.
   * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Number} Returns the responce with updated Image object from the Images table.
   **/
  async update(id, body, next) {
    try {
      const { url, name, description, isPrivate, userId } = body;
      await imagesModel.update(
        {
          url,
          name,
          description,
          isPrivate,
          userId,
        },
        {
          where: {
            id,
          },
        },
      );

      return HSC.OK;
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Delete Image object record by Id in the Images table.
   * @param {Integer} id Image id from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Number} Returns the responce with code 200.
   **/
  async delete(id, next) {
    try {
      await imagesModel.destroy({
        where: {
          id,
        },
      });

      return HSC.OK;
    } catch (e) {
      return next(e);
    }
  },
};
