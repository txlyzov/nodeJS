const db = require('../utils/db-pool');



module.exports ={
    async createImage(req,res){       
        try{
            const {url,name,description,is_private,user_id} = req.body;
            const image = await db.query('INSERT INTO images (url, name, description, is_private, user_id, created_at, updated_at) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
            [url,name,description,is_private,user_id,new Date(),new Date()]);
            return res.json(image.rows[0])
        } catch (err){
            return res.status(500).send({
                message:`error: ${err.message}`
            })
        }
    },
    async getImages(req,res){
        const images = await db.query('SELECT * FROM images');
        res.json(images.rows)
    },
    async getOneImage(req,res){
        const id = req.params.id;
        const images = await db.query('SELECT * FROM images where image_id=$1',
        [id]);
        return res.json(images.rows[0])
    },
    async updateImage(req,res){
        const id = req.params.id;
        const {url,name,description,is_private,user_id} = req.body;
        const image = await db.query('UPDATE images set url = $1, name = $2, description = $3, is_private = $4, user_id = $5, updated_at = $6 WHERE image_id = $7 RETURNING *',
        [url,name,description,is_private,user_id,new Date(),id]);
        return res.json(image.rows[0])
    },
    async deleteImage(req,res){
        const id = req.params.id;
        await db.query('DELETE FROM images where image_id = $1',
        [id]);
        return res.status(200).send('done');
    }
}