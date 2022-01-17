const HSC = require('http-status-codes');
const service = require('./services/users-service');

module.exports = {
  async createUser(req, res) {
    return res.json(await service.create(req.body));
  },
  async getUsers(req, res, next) {
    const result = await service.get();
    if (!result.length) return next();

    return res.json(result);
  },
  async getOneUser(req, res, next) {
    const result = await service.getOneById(req.params.id);
    if (!result) return next();

    return res.json(result);
  },
  async updateUser(req, res) {
    const result = await service.update(req.params.id, req.body);
    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
  async deleteUser(req, res) {
    const result = await service.delete(req.params.id);
    if (result === 1) return res.sendStatus(HSC.OK);

    return res.sendStatus(HSC.BAD_REQUEST);
  },
};
