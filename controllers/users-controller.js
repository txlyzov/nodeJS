const service = require('./services/users-servises');

module.exports = {
  async createUser(req, res) {
    return res.json(await service.create(req.body));
  },
  async getUsers(req, res) {
    return res.json(await service.get());
  },
  async getOneUser(req, res) {
    return res.json(await service.getOne(req.params.id));
  },
  async updateUser(req, res) {
    return res.sendStatus(await service.update(req.params.id, req.body));
  },
  async deleteUser(req, res) {
    return res.sendStatus(await service.delete(req.params.id));
  },
};
