const service = require('./services/users-servises');

module.exports = {
    async createUser(req, res) {
        return service.create(req.body, res);
    },
    async getUsers(req, res) { 
        return service.get(res);
    },
    async getOneUser(req, res) {
        return service.getOne(req.params.id, res);
    },
    async updateUser(req, res) {
        return service.update(req.params.id, req.body, res);
    },
    async deleteUser(req, res) {
        return service.delete(req.params.id, res);
    }
}
