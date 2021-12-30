const db = require('../utils/db-pool');
// const User = require('../models').Users;
const Users = require('../models/Users');

// var sequelize = require('sequelize');

// const Users = sequelize.import('../models/Users');






module.exports ={
    async createUser(req,res){
        const {login,email,password} = req.body;
        // const newUser = await db.query('INSERT INTO users (login, email, password, created_at, updated_at) values ($1,$2,$3,$4,$5) RETURNING *',[login,email,password,new Date(),new Date()]);
        // res.json(newUser.rows[0])
        try{
            let newUser=await Users.create({
                login,
                email,
                password,
            })
            return res.send(newUser);
        } catch (err){
            return res.status(500).send({
                message:`error: ${err.message}`
            })
        }
    },
    async getUsers(req,res){
        const users = await db.query('SELECT * FROM users');
        res.json(users.rows)
    },
    async getOneUser(req,res){
        const users = await db.query('SELECT * FROM users');
        res.json(users.rows)
        // console.log(43534433);
        // console.log(res.send);
        // res.send({
        //     message: 'This is working',
        // })
        // const {id} =req.params;

        // const user=await User.findOne({
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
        
    },
    async deleteUser(req,res){
        
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