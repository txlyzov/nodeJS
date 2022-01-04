const usersModel = require('../../models').users;
const HSC = require('http-status-codes')


// catch (err) {
//     return res.status(HSC.INTERNAL_SERVER_ERROR).send({
//         message: `error: ${err.message}`
//     })
// }


module.exports = {
    /**
     * Creates User object record in Users table.
     * @param {Body} body Entitry for getting login, email, password from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with new created User object.
     **/
    async create(body, res) {

        const { login, email, password } = body;
        const user = await usersModel.create({
            login,
            email,
            password,
        })

        return res.json(user);
    },
     /**
     * Gets all User object records in the Users table.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with all User objects from the Users table.
     **/
    async get(res) {

        const users = await usersModel.findAll();

        return res.send(users);
    },
     /**
     * Gets one User object record by id in Users table.
     * @param {Integer} id User id from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with one User object from the Users table.
     **/
    async getOne(id, res) {

        const user = await usersModel.findAll({
            where: {
                id
            }
        });

        return res.json(user);
    },
    /**
     * Update User object record in the Users table.
     * @param {Integer} id User id from request.
     * @param {Body} body Entitry for getting login, email, password from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with updated User object from the Users table.
     **/
    async update(id, body, res) {

        const { login, email, password } = body;
        const user = await usersModel.update(
            {
                login,
                email,
                password
            },
            {
                where: {
                    id
                }
            }
        );

        return res.json(user);
    },
    /**
     * Delete User object record by Id in the Users table.
     * @param {Integer} id User id from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with code 200.
     **/
    async delete(id, res) {

        await usersModel.destroy({
            where: {
                id
            }
        });

        return res.sendStatus(HSC.OK);
    }
}
