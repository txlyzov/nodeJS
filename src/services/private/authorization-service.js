const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('./../public/users-service');
require('dotenv').config();
const { error } = require('../../utils/consts');

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;

module.exports = {
  /**
   * Creates new User account.
   * @param {Body} body Entitry for getting password from request and put data into create function.
   * @returns {Object} Returns the responce with new created User object.
   **/
  async signUp(body) {
    const { password: plainTextPassword } = body;
    const codedPassword = await bcrypt.hash(plainTextPassword, BCRYPT_SALT);
    body.password = codedPassword;

    return usersService.create(body);
  },

  /**
   * Authorize user by login and password.
   * @param {Body} body Entitry for getting login and password from request.
   * @returns {Object} Returns the object with error status and responce data.
   **/
  async login(body) {
    const { login, password: plainTextPassword } = body;
    const userByLogin = await usersService.getOneByLogin(login);

    if (!userByLogin) {
      return { error: error.WRONG_USER, data: null };
    }

    const passwordCheck = await bcrypt.compare(
      plainTextPassword,
      userByLogin.password,
    );

    if (passwordCheck) {
      const token = jwt.sign({ id: userByLogin.id, login }, JWT_SECRET, {
        expiresIn: TOKEN_LIFETIME,
      });

      return { error: null, data: { token, login } };
    }

    return { error: error.WRONG_PASSWORD, data: null };
  },

  /**
   * Token check and changing password.
   * @param {Body} body Entitry for getting token and password from request.
   * @returns {Object} Returns the responce with updated User object from the Users table.
   **/
  async changePassword(body) {
    const { token, password: newPlainTextPassword } = body;
    const user = jwt.verify(token, JWT_SECRET);

    return usersService.updatePassword(
      user.id,
      await bcrypt.hash(newPlainTextPassword, BCRYPT_SALT),
    );
  },
};
