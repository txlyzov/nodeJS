const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = require('./users-service');

const JWT_SECRET = 'dfjk4j:kdf%№":g3490xcin№j34w8**)(jvcx';

module.exports = {
  async signUp(body) {
    const { password: plainTextPassword } = body;
    const codedPassword = await bcrypt.hash(plainTextPassword, 10);
    body.password = codedPassword;

    return await service.create(body);
  },

  async login(body) {
    const { login, password: plainTextPassword } = body;
    const userByLogin = await service.getOneByLogin(login);
    if (!userByLogin) {
      return { error: 'wrong user', data: null };
    }
    if (await bcrypt.compare(plainTextPassword, userByLogin.password)) {
      const token = jwt.sign({ id: userByLogin.id, login }, JWT_SECRET);

      return { error: null, data: { token, login } };
    }

    return { error: 'wrong password', data: null };
  },

  async changePassword(body) {
    const { token, password: newPlainTextPassword } = body;
    const user = jwt.verify(token, JWT_SECRET);
    const result = await service.updatePassword(
      user.id,
      await bcrypt.hash(newPlainTextPassword, 10),
    );

    if (result == 1) {
      return { error: null };
    }

    return { error: 'something wrong' };
  },
};
