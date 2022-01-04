const imagesModel = require('../../models').images;
const HSC = require('http-status-codes')


// catch (err) {
//     return res.status(HSC.INTERNAL_SERVER_ERROR).send({
//         message: `error: ${err.message}`
//     })
// }


module.exports = {
    /**
     * Creates Image object record in Images table.
     * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with new created Image object.
     **/
    async create(body, res) {

        const { url, name, description, isPrivate, userId } = body;
        const image = await imagesModel.create({
            url,
            name,
            description,
            isPrivate,
            userId
        })
        return res.json(image);
    },
    /**
     * Gets all Image object records in the Images table.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with all Image objects from the Images table.
     **/
    async get(res) {
    //async get() {
        const images = await imagesModel.findAll();
        //console.log(images);
        return res.json(images);
        //return images;
    },
    /**
     * Gets one Image object record by id in the Images table.
     * @param {Integer} id Image id from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with one Image object from the Images table.
     **/
    async getOne(id,res) {

        const image = await imagesModel.findAll({
            where: {
                id
            }
        });
        return res.json(image);
    },
    /**
     * Update Image object record in the Images table.
     * @param {Integer} id Image id from request.
     * @param {Body} body Entitry for getting url, name, description, isPrivate, userId from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with updated Image object from the Images table.
     **/
    async update(id, body, res) {

        const { url, name, description, isPrivate, userId } = body;
        const image = await imagesModel.update(
            {
                url,
                name,
                description,
                isPrivate,
                userId
            },
            {
                where: {
                    id
                }
            }
        );
        return res.json(image);
    },
    /**
     * Delete Image object record by Id in the Images table.
     * @param {Integer} id Image id from request.
     * @param {Responce} res Empty entity for responce.
     * @returns {Object} Returns the responce with code 200.
     **/
    async delete(id, res) {

        const image = await imagesModel.destroy({
            where: {
                id
            }
        });

        return res.sendStatus(HSC.OK);
    }
}
