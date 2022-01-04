const service = require('./services/images-service');

module.exports = {
    async createImage(req, res) {
        return service.create(req.body, res);
    },
    async getImages(req,res) {
        //return res.json(service.get(req, res));
        //let qwe = service.get();
        //console.log(qwe); 
        //return res.send(qwe);
        return service.get(res);
    },
    async getOneImage(req, res) {
        return service.getOne(req.params.id,res);
    },
    async updateImage(req, res) {
        return service.update(req.params.id, req.body, res);
    },
    async deleteImage(req, res) {
        return service.delete(req.params.id, res);
    }
}
