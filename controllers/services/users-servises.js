const usersModel = require('../../models').users;
const HSC = require('http-status-codes')

module.exports = {
    async create(req, res) {
        try {
            const { login, email, password } = req.body;
            let user = await usersModel.create({
                login,
                email,
                password,
            })
            return res.json(user)
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }
    },
    async get(req, res) {
        try {
            let users = await usersModel.findAll();
            return res.send(users)
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    },
    async getOne(req, res) {
        try {
            const id = req.params.id;
            let user = await usersModel.findAll({
                where: {
                    id: id
                }
            });
            return res.json(user)
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }

    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const { login, email, password } = req.body;
            let user = await usersModel.update(
                {
                    login: login,
                    email: email,
                    password: password
                },
                {
                    where: {
                        id: id
                    }
                }
            );
            return res.json(user)
        } catch (err) {
            return res.status(HSC.INTERNAL_SERVER_ERROR).send({
                message: `error: ${err.message}`
            })
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            let user = await usersModel.destroy({
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
