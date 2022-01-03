const service = require('./services/users-servises');

module.exports ={
    async createUser(req,res){
       return service.create(req,res);
    },
    async getUsers(req,res){
        return service.get(req,res);  
    },
    async getOneUser(req,res){
        return service.getOne(req,res);
    },
    async updateUser(req,res){
        return service.update(req,res);
    },
    async deleteUser(req,res){
        return service.delete(req,res);
    }
}
