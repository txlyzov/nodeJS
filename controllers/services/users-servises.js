const HSC = require('http-status-codes');
const usersModel = require('../../models').users;

// catch (err) {
//     return res.status(HSC.INTERNAL_SERVER_ERROR).send({
//         message: `error: ${err.message}`
//     })
// }

module.exports = {
  /**
   * Creates User object record in Users table.
   * @param {Body} body Entitry for getting login, email, password from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Object} Returns the responce with new created User object.
   **/
  async create(body, next) {
    try {
      const { login, email, password } = body;
      const user = await usersModel.create({
        login,
        email,
        password,
      });

      return user;
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Gets all User object records in the Users table.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Array|Object} Returns the responce with all User objects from the Users table.
   **/
  async get(next) {
    try {
      const users = await usersModel.findAll();
      if (!users) return next();

      return users;
    } catch (e) {
      return next();
    }
  },

  /**
   * Gets one User object record by id in Users table.
   * @param {Integer} id User id from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Object} Returns the responce with one User object from the Users table.
   **/
  async getOne(id, next) {
    try {
      const user = await usersModel.findOne({
        where: {
          id,
        },
      });
      if (!user) return next();

      return user;
    } catch (e) {
      return next();
    }
  },

  /**
   * Update User object record in the Users table.
   * @param {Integer} id User id from request.
   * @param {Body} body Entitry for getting login, email, password from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Number} Returns the responce with updated User object from the Users table.
   **/
  async update(id, body, next) {
    try {
      const { login, email, password } = body;
      await usersModel.update(
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

      return HSC.OK;
    } catch (e) {
      return next(e);
    }
  },

  /**
   * Delete User object record by Id in the Users table.
   * @param {Integer} id User id from request.
   * @param {NextFunction} next Parameter for using error handler.
   * @returns {Number} Returns the responce with code 200.
   **/
  async delete(id, next) {
    try {
      await usersModel.destroy({
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
