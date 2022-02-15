const Sequelize = require('sequelize');
const imagesModel = require('../../models').images;

const PRIVACY_FILTER_IS_PRIVATE = 'private';

module.exports = {
  /**
   * Creates Image object record in Images table.
   * @param {Request} req Request entity for getting data from it.
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
   * Gets all relevant public Image object records in the Images table.
   * @param {Request} req Request entity for getting data from it.
   * @returns {Array|Object}} Returns the responce with all Image objects from the Images table and number of records.
   **/
  async getPublic(req) {
    const { page, limit } = req.query;
    const searchGoal = req.query.searchGoal;

    let where = {
      isPrivate: false,
    };

    if (searchGoal) {
      where = {
        ...where,
        name: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          'LIKE',
          '%' + searchGoal.toLowerCase() + '%',
        ),
      };
    }

    return imagesModel.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
    });
  },

  /**
   * Gets all relevant user Image object records in the Images table.
   * @param {Request} req Request entity for getting data from it.
   * @returns {Array|Object} Returns the responce with all Image objects from the Images table.
   **/
  async getByUserId(req) {
    const userId = req.body.userId;
    const { page, limit, privacyFilter } = req.query;
    const searchGoal = req.query.searchGoal;

    let where = {
      userId,
    };

    if (searchGoal) {
      console.log(`sg: ${searchGoal}`);
      where = {
        ...where,
        name: Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('name')),
          'LIKE',
          '%' + searchGoal.toLowerCase() + '%',
        ),
      };
    }

    if (privacyFilter) {
      where = {
        ...where,
        isPrivate: privacyFilter === PRIVACY_FILTER_IS_PRIVATE,
      };
    }

    return imagesModel.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
    });
  },

  /**
   * Gets one Image object record by id in the Images table.
   * @param {Request} req Request entity for getting data from it.
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
   * @param {Request} req Request entity for getting data from it.
   * @returns {Number} Returns the responce with updated Image object from the Images table.
   **/
  async updateByIdAndUserId(req) {
    const { id, name, description, isPrivate, userId } = req.body;
    const result = await imagesModel.update(
      {
        name,
        description,
        isPrivate,
      },
      {
        where: {
          id,
          userId,
        },
      },
    );

    return result[0];
  },

  /**
   * Update Image object record in the Images table.
   * @param {Request} req Request entity for getting data from it.
   * @returns {Number} Returns the responce with number 1 on success and 0 on fail.
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
   * @param {Request} req Request entity for getting data from it.
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
