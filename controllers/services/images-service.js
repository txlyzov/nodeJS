const imagesModel = require('../../models').images;
const HSC = require('http-status-codes')

module.exports = {
    async create(req, res) {
        try {
            const { url, name, description, isPrivate, userId } = req.body;
            let image = await imagesModel.create({
                url,
                name,
                description,
                isPrivate,
                userId
            })
            return res.json(image)
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    },
    async get(req, res) {
        try {
            let images = await imagesModel.findAll();
            return res.send(images);
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    },
    async getOne(req, res) {
        try {
            const id = req.params.id;
            let image = await imagesModel.findAll({
                where: {
                    id: id
                }
            });
            return res.json(image);
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    },
    async update(req, res) {
        try {
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
            return res.json(image);
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            let image = await imagesModel.destroy({
                where: {
                    id: id
                }
            });
            return res.sendStatus(HSC.OK);
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    }
}
