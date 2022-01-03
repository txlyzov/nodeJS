const db = require('../utils/db-pool');
const imagesModel = require('../models').images;


module.exports = {
    async createImage(req, res) {
        const { url, name, description, isPrivate, userId } = req.body;
        let image = await imagesModel.create({
            url,
            name,
            description,
            isPrivate,
            userId
        })
        return res.json(image)
    },
    async getImages(req, res) {
        let images = await imagesModel.findAll();
        return res.send(images)
    },
    async getOneImage(req, res) {
        const id = req.params.id;
        let image = await imagesModel.findAll({
            where: {
                id: id
            }
        });
        return res.json(image)
    },
    async updateImage(req, res) {
        const id = req.params.id;
        const { url, name, description, isPrivate, userId } = req.body;
        let image = await imagesModel.update(
            {
                url: url,
                name: name,
                description: description,
                isPrivate: isPrivate,
                userId: userId
            },
            {
                where: {
                    id: id
                }
            }
        );
        return res.json(image)
    },
    async deleteImage(req, res) {
        const id = req.params.id;
        let image = await imagesModel.destroy({ 
                where: {
                    id: id
                }
            });
        return res.sendStatus(200);
    }
}
