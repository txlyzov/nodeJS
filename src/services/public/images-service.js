const imagesModel = require('../../models').images;

module.exports = {
  /**
   * Creates Image object record in Images table.
   * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
   * @returns {Object} Returns the responce with new created Image object.
   **/
  async create(req) {
    const { url, name, description, isPrivate, userId } = req.body;

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
   * @returns {Array|Object}} Returns the responce with all Image objects from the Images table.
   **/
  async getPublic() {
    return imagesModel.findAll({
      where: {
        isPrivate: false,
      },
    });
  },

  /**
   * Gets all Image object records in the Images table.
   * @returns {Array|Object}} Returns the responce with all Image objects from the Images table.
   **/
  async getPublicPagination(req) {
    const { page, limit } = req.query;

    return imagesModel.findAndCountAll({
      where: {
        isPrivate: false,
      },
      offset: (page - 1) * limit,
      limit: limit,
      subQuery: false,
    });
  },

  /**
   * Gets all Image object records in the Images table with one owner.
   * @param {Integer} userId User id for search.
   * @returns {Array|Object} Returns the responce with all Image objects from the Images table.
   **/
  async getAllByUserId(req) {
    const userId = req.body.userId;

    return imagesModel.findAll({
      where: {
        userId,
      },
    });
  },

  /**
   * Gets all Image object records in the Images table with one owner.
   * @param {Integer} userId User id for search.
   * @returns {Array|Object} Returns the responce with all Image objects from the Images table.
   **/
  async getAllByUserIdPagination(req) {
    const userId = req.body.userId;
    const { page, limit } = req.query;

    return imagesModel.findAndCountAll({
      where: {
        userId,
      },
      offset: (page - 1) * limit,
      limit: limit,
      subQuery: false,
    });
  },

  /**
   * Gets one Image object record by id in the Images table.
   * @param {Integer} id Image id from request.
   * @param {Integer} userId User id from request.
   * @returns {Object} Returns the responce with one Image object from the Images table.
   **/
  async getOneByIdAndUserId(req) {
    const id = req.params.id;
    const userId = req.body.userId;

    return imagesModel.findOne({
      where: {
        id,
        userId,
      },
    });
  },

  /**
   * Update Image object record in the Images table.
   * @param {Body} body Entitry for getting id, url, name, description, isPrivate, userId from request.
   * @returns {Number} Returns the responce with updated Image object from the Images table.
   **/
  async updateByIdAndUserId(req) {
    const { id, name, description, isPrivate, userId } = req.body;
    const result = await imagesModel.update(
      {
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
   * Update Image object record in the Images table.
   * @param {Integer} id Image id from request.
   * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
   * @returns {Number} Returns the responce with updated Image object from the Images table.
   **/
  async update(req) {
    const id = req.params.id;
    const { url, name, description, isPrivate, userId } = req.body;
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
   * @param {Body} body Entitry for getting image id and user id from request.
   * @returns {Number} Returns the responce with number 1 on success and 0 on fail.
   **/
  async deleteByIdAndUserId(req) {
    const id = req.params.id;
    const userId = req.body.userId;

    return imagesModel.destroy({
      where: {
        id,
        userId,
      },
    });
  },
};
