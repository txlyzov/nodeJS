const HSC = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = require('./services/users-service');

const JWT_SECRET = 'dfjk4j:kdf%№":g3490xcin№j34w8**)(jvcx';

module.exports = {
  async signUp(req, res) {
    const { password: plainTextPassword } = req.body;
    const codedPassword = await bcrypt.hash(plainTextPassword, 10);

    req.body.password = codedPassword;
    await service.create(req.body);

    return res.sendStatus(HSC.OK);
  },

  async login(req, res) {
    const { login, password: plainTextPassword } = req.body;
    const userByLogin = await service.getOneByLogin(login);
    console.log(userByLogin);
    if (!userByLogin) {
      return res
        .status(HSC.BAD_REQUEST)
        .send(`User with login "${login}" not exists.`);
    }
    if (await bcrypt.compare(plainTextPassword, userByLogin.password)) {
      const token = jwt.sign({ id: userByLogin.id, login }, JWT_SECRET);

      return res.status(HSC.OK).json({ data: token });
    }
  },

  async changePassrod(req, res) {
    const { token, password: newPlainTextPassword } = req.body;
    const user = jwt.verify(token, JWT_SECRET);
    service.updatePassword(
      user.id,
      await bcrypt.hash(newPlainTextPassword, 10),
    );

    return res.status(HSC.OK).send('Password changed.');
  },
};
