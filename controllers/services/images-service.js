const imagesModel = require('../../models').images;

module.exports = {
  /**
   * Creates Image object record in Images table.
   * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
   * @returns {Object} Returns the responce with new created Image object.
   **/
  async create(body) {
    const { url, name, description, isPrivate, userId } = body;

    return imagesModel.create({
      url,
      name,
      description,
      isPrivate,
      userId,
    });
  },

  /**
   * Gets all Image object records in the Images table.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Array|Object}} Returns the responce with all Image objects from the Images table.
   **/
  async get() {
    const images = await imagesModel.findAll();

    return images;
  },

  /**
   * Gets one Image object record by id in the Images table.
   * @param {Integer} id Image id from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Object} Returns the responce with one Image object from the Images table.
   **/
  async getOne(id) {
    const image = await imagesModel.findOne({
      where: {
        id,
      },
    });

    return image;
  },

  /**
   * Update Image object record in the Images table.
   * @param {Integer} id Image id from request.
   * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
   * @returns {Number} Returns the responce with updated Image object from the Images table.
   **/
  async update(id, body) {
    const { url, name, description, isPrivate, userId } = body;
    const result = await imagesModel.update(
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

    return result[0];
  },

  /**
   * Delete Image object record by Id in the Images table.
   * @param {Integer} id Image id from request.
   * @returns {Number} Returns the responce with code 200.
   **/
  async delete(id) {
    return imagesModel.destroy({
      where: {
        id,
      },
    });
  },
};
