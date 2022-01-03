const servise = require('./services/images-service');

module.exports = {
    async createImage(req, res) {
        return servise.create(req, res)
    },
    async getImages(req, res) {
        return servise.get(req, res)
    },
    async getOneImage(req, res) {
        return servise.getOne(req, res)
    },
    async updateImage(req, res) {
        return servise.update(req, res)
    },
    async deleteImage(req, res) {
        return servise.delete(req, res)
    }
}
