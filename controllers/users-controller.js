const service = require('./services/users-servises');

module.exports = {
  async createUser(req, res, next) {
    return res.json(await service.create(req.body, next));
  },
  async getUsers(req, res, next) {
    return res.json(await service.get(next));
  },
  async getOneUser(req, res, next) {
    return res.json(await service.getOne(req.params.id, next));
  },
  async updateUser(req, res, next) {
    return res.sendStatus(await service.update(req.params.id, req.body, next));
  },
  async deleteUser(req, res, next) {
    return res.sendStatus(await service.delete(req.params.id, next));
  },
};
