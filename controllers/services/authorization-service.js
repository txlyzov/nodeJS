const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = require('./users-service');
require('dotenv').config();
const constants = require('./../../utils/error-names').error;

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;

module.exports = {
  async signUp(body) {
    const { password: plainTextPassword } = body;
    const codedPassword = await bcrypt.hash(plainTextPassword, BCRYPT_SALT);
    body.password = codedPassword;

    return service.create(body);
  },

  async login(body) {
    const { login, password: plainTextPassword } = body;
    const userByLogin = await service.getOneByLogin(login);

    if (!userByLogin) {
      return { error: constants.WRONG_USER, data: null };
    }

    if (await bcrypt.compare(plainTextPassword, userByLogin.password)) {
      const token = jwt.sign({ id: userByLogin.id, login }, JWT_SECRET, {
        expiresIn: TOKEN_LIFETIME,
      });

      return { error: null, data: { token, login } };
    }

    return { error: constants.WRONG_PASSWORD, data: null };
  },

  async changePassword(body) {
    const { token, password: newPlainTextPassword } = body;
    const user = jwt.verify(token, JWT_SECRET);

    return service.updatePassword(
      user.id,
      await bcrypt.hash(newPlainTextPassword, BCRYPT_SALT),
    );
  },
};
