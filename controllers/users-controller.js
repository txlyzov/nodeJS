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
    return res.sendStatus(await service.update(req.params.id, req.body));
  },
  async deleteUser(req, res) {
    return res.sendStatus(await service.delete(req.params.id));
  },
};
