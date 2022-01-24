const usersModel = require('../../models').users;

module.exports = {
  /**
   * Creates User object record in Users table.
   * @param {Body} body Entitry for getting login, email, password from request.
   * @returns {Object} Returns the responce with new created User object.
   **/
  async create(body) {
    const { login, email, password } = body;

    return usersModel.create({
      login,
      email,
      password,
    });
  },

  /**
   * Gets all User object records in the Users table.
   * @returns {Array|Object} Returns the responce with all User objects from the Users table.
   **/
  async get() {
    return await usersModel.findAll();
  },

  /**
   * Gets one User object record by id in Users table.
   * @param {Integer} id User id value from request.
   * @returns {Object} Returns the responce with one User object from the Users table.
   **/
  async getOneById(id) {
    return await usersModel.findOne({
      where: {
        id,
      },
    });
  },

  /**
   * Gets one User object record by id in Users table.
   * @param {String} login User login value from request.
   * @returns {Object} Returns the responce with one User object from the Users table.
   **/
  async getOneByLogin(login) {
    return await usersModel.findOne({
      where: {
        login,
      },
    });
  },

  /**
   * Update User object record in the Users table.
   * @param {Integer} id User id from request.
   * @param {Body} body Entitry for getting login, email, password from request.
   * @returns {Number} Returns the responce with updated User object from the Users table.
   **/
  async update(id, body) {
    const { login, email, password } = body;
    const result = await usersModel.update(
      {
        login,
        email,
        password,
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
   * Update User object record's password in the Users table.
   * @param {Integer} id User id from request.
   * @param {String} password New password string to set.
   * @returns {Number} Returns the responce with updated User object from the Users table.
   **/
  async updatePassword(id, password) {
    const result = await usersModel.update(
      {
        password,
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
   * Delete User object record by Id in the Users table.
   * @param {Integer} id User id from request.
   * @returns {Number} Returns the responce with code 200.
   **/
  async delete(id) {
    return usersModel.destroy({
      where: {
        id,
      },
    });
  },
};
