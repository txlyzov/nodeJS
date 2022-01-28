const HSC = require('http-status-codes');
const { authorizationService } = require('../../services');

const WRONG_USER_ERROR = 'wrong user';
const WRONG_PASSWORD_ERROR = 'wrong password';

module.exports = {
  async signUp(req, res) {
    await authorizationService.signUp(req.body);

    return res.sendStatus(HSC.OK);
  },

  async login(req, res) {
    const result = await authorizationService.login(req.body);

    if (result.error === WRONG_USER_ERROR) {
      return res
        .status(HSC.BAD_REQUEST)
        .send(`User with login "${req.body.login}" not exists.`);
    }

    if (result.error === WRONG_PASSWORD_ERROR) {
      return res
        .status(HSC.BAD_REQUEST)
        .send(`Wrong password for user with login "${req.body.login}".`);
    }

    return res.status(HSC.OK).json(result.data);
  },

  async changePassword(req, res) {
    await authorizationService.changePassword(req.body);

    return res.status(HSC.OK).send('Password changed.');
  },
};
