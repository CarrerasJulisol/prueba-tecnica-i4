import User from "../dao/mongoose/models/users.model.js";
import GenericRepository from "../services/genericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao){
        super(dao,User.model);
    }

    async getUsername(username){
        return this.dao.getByUsername(username,this.entity)
    }

    async changePassword(user,newPassword) {
        return this.dao.changePassword(user._id,newPassword,this.entity)
    }

    async changeName(user,newName) {
        return this.dao.changeName(user._id,newName,this.entity)
    }

    async changeLastname(user,newLastname) {
        return this.dao.changeLastname(user._id,newLastname,this.entity)
    }

    async changeEmail(user,newEmail) {
        return this.dao.changeEmail(user._id,newEmail,this.entity)
    }

    async changeUsername(user,newUsername) {
        return this.dao.changeUsername(user._id,newUsername,this.entity)
    }

    async changePFP(user) {
        return this.dao.changePFP(user._id,user.pfp,this.entity)
    }
    
    //all
    async get(){
        return this.dao.getAll(this.entity)
    }

    async saveOne(user){
        return this.dao.save(user,this.entity)
    }

    async getID(id){
        return this.dao.getByID(id,this.entity)
    }

    async deleteOne(id){
        return this.dao.delete(id,this.entity)
    }
}
