const HSC = require('http-status-codes');
const service = require('./services/users-servises');

module.exports = {
  async createUser(req, res) {
    return res.json(await service.create(req.body));
  },
  async getUsers(req, res, next) {
    return res.json(await service.get(next));
  },
  async getOneUser(req, res, next) {
    return res.json(await service.getOne(req.params.id, next));
  },
  async updateUser(req, res) {
    const result = await service.update(req.params.id, req.body);
    if (result === 1) return res.sendStatus(HSC.OK);
    if (result === 0) return res.sendStatus(HSC.NOT_FOUND);
  },
  async deleteUser(req, res) {
    const result = await service.delete(req.params.id);
    if (result === 1) return res.sendStatus(HSC.OK);
    if (result === 0) return res.sendStatus(HSC.NOT_FOUND);
  },
};
