//const db = require('../utils/db-pool');
const usersModel = require('../models').images;
//const models = require('../models');
//const index = require
//const Users = require('../models/Users');

// var sequelize = require('sequelize');

// const Users = sequelize.import('../models/Users');






module.exports ={
    async createUser(req,res){
        // console.log(models);
        // console.log(234234234);
        // console.log(Users);
        //try{
             const {login,email,password} = req.body;
             
            //  const user = await db.query('INSERT INTO users (login,email,password,createdAt,updatedAt) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            // [login,email,password,new Date(),new Date()]);
            // const user = await db.query('INSERT INTO users (login, email, password, created_at, updated_at) values ($1,$2,$3,$4,$5) RETURNING *',
            // [login,email,password,new Date(),new Date()]);
       //console.log(Users);
       //const test = Users();
       //console.log(test);
            let user=await usersModel.create({
                login,
                email,
                password,
            })
            return res.json(user)
            //return res.json(user.rows[0])
        // } catch (err){
        //     return res.status(500).send({
        //         message:`error: ${err.message}`
        //     })
        // }
    },
    async getUsers(req,res){
        // const users = await db.query('SELECT * FROM users');
        // res.json(users.rows)
        let users = await usersModel.findAll();
        return res.send(users)
    },
    async getOneUser(req,res){
        const id = req.params.id;
        let user = await usersModel.findAll({
            where: {
              id: id
            }
          });
        return res.json(user)
        
        // const id = req.params.id;
        // const user = await db.query('SELECT * FROM users where user_id=$1',
        // [id]);
        // return res.json(user.rows[0])


        //res.json(users.rows)
        // console.log(43534433);
        // console.log(res.send);
        // res.send({
        //     message: 'This is working',
        // })
        // const {id} =req.params;

        // const user=await Users.findOne({
        //     where:{
        //         id,
        //     },
        // });

        // if(!user){
        //     return res.status(400).send({
        //         message: `No usser found with the id ${id}`,
        //     });
        // }

        // return res.send(user)
    },
    async updateUser(req,res){
        const id = req.params.id;
        const {login,email,password} = req.body;
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
        // const user = await db.query('UPDATE users set login = $1, email = $2, password = $3, updated_at = $4 WHERE user_id = $5 RETURNING *',
        // [login,email,password,new Date(),id]);
        // return res.json(user.rows[0])
    },
    async deleteUser(req,res){
        const id = req.params.id;
        let user = await usersModel.destroy({ 
                where: {
                    id: id
                }
            });
        // await db.query('DELETE FROM users where user_id = $1',
        // [id]);
        return res.sendStatus(200);
        //return res.status(200).send('done');;
    }
}


// exports.getOneUser = async(req,res)=>{
//     const {id} =req.params;

//     console.log(Users);
//         const user=await Users.findOne({
//             where:{
//                 id,
//             },
//         });

//         if(!user){
//             return res.status(400).send({
//                 message: `No usser found with the id ${id}`,
//             });
//         }

//         return res.send(user)
// }



// const user = db.database.Users;

// const getOneUser = ((req, res) => {
//     console.log(43534433);
//     res.send({
//         message: 'This is working',
//     })
// })

// module.exports ={
//     getOneUser
// }


// module.exports = {
//     async createUser(req,res){
      
//     },
//     async getUsers(req,res){
        
//     },
//     async getOneUser(req,res){
//         // const users = await debug.query('SELECT * FROM users');
//         // res.json(users.rows)
//         console.log(43534433);
//         res.send({
//             message: 'This is working',
//         })
//     },
//     async updateUser(req,res){
        
//     },
//     async deleteUser(req,res){
        
//     },
// }





//module.exports = 
// class UserController{
//     async createUser(req,res){
      
//     }
//     async getUsers(req,res){
        
//     }
//     async getOneUser(req,res){
//         // const users = await db.query('SELECT * FROM users');
//         res.json(users.rows)
//         console.log(43534433);
//         console.log(res.send);
//         res.send({
//             message: 'This is working',
//         })
//     }
//     async updateUser(req,res){
        
//     }
//     async deleteUser(req,res){
        
//     }
// }


// module.exports = new UserController()









// exports.getOneUser = async(req,res)=>{
//     // const users = await debug.query('SELECT * FROM users');
//     // res.json(users.rows)
//     console.log(43534433);
//     // res.send({
//     //     message: 'This is working',
//     // })
// }
