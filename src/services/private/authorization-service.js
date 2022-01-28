const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('./../public/users-service');
require('dotenv').config();
const { error } = require('../../utils/consts');

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;

module.exports = {
  async signUp(body) {
    const { password: plainTextPassword } = body;
    const codedPassword = await bcrypt.hash(plainTextPassword, BCRYPT_SALT);
    body.password = codedPassword;

    return usersService.create(body);
  },

  async login(body) {
    const { login, password: plainTextPassword } = body;
    const userByLogin = await usersService.getOneByLogin(login);

    if (!userByLogin) {
      return { error: error.WRONG_USER, data: null };
    }

    if (await bcrypt.compare(plainTextPassword, userByLogin.password)) {
      const token = jwt.sign({ id: userByLogin.id, login }, JWT_SECRET, {
        expiresIn: TOKEN_LIFETIME,
      });

      return { error: null, data: { token, login } };
    }

    return { error: error.WRONG_PASSWORD, data: null };
  },

  async changePassword(body) {
    const { token, password: newPlainTextPassword } = body;
    const user = jwt.verify(token, JWT_SECRET);

    return usersService.updatePassword(
      user.id,
      await bcrypt.hash(newPlainTextPassword, BCRYPT_SALT),
    );
  },
};
