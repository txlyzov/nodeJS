const HSC = require('http-status-codes');
const usersService = require('../../services/index').usersService;

module.exports = {
  async createUser(req, res) {
    return res.json(await usersService.create(req.body));
  },
  async getUsers(req, res, next) {
    const result = await usersService.get();

    if (!result.length) return next();

    return res.json(result);
  },
  async getOneUser(req, res, next) {
    const result = await usersService.getOneById(req.params.id);

    if (!result) return next();

    return res.json(result);
  },
  async updateUser(req, res) {
    const result = await usersService.update(req.params.id, req.body);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
  async deleteUser(req, res) {
    const result = await usersService.delete(req.params.id);

    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
