// 
const AppError = require("../../utils/appError");

// user model
const UserModel = require("./model")

class User {
    // all number of users
    static async usersCount(){
        try {
            
            const users = await UserModel.countDocuments()
            return users;

        } catch (error) {
            throw error;
        }
    }
    // get all users
    static async fetchUsers(page, limit){
        
        try {
            
            const users = await UserModel.find().limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
               
            return users;
        } catch (error) {
            throw error;
        }
    }
    // filter user
    static async filterUser(filters){
        try {
            // get all users
            const user = await UserModel.find()
            // filter users
            const filteredUser = await user.filter( u=>{
           
                let isValid = true;
                for (let key in filters) {
             
                    isValid = isValid && u[key] == filters[key];
                }
                return isValid;
            })
            return filteredUser;
        } catch (error) {
            throw error
        }
    }
    // get user by ID
    static async getUserById(id){
        try {
            const user = await UserModel.findById(id);
            return user;

        } catch (error) {
            throw error;
        }
    }
    // add user
    static async createUser(data){
        try {

            const user = await UserModel.insertMany(data);
            if (!user){
                throw new AppError("There is a field missing", 400)
            }
            return user;
        } catch (error) {
            throw error
            
        }
    }
    // update users
    static async updateUser(id,data){
        try {
       
            const user = await UserModel.findByIdAndUpdate(id,data);
            return user;
        } catch (error) {
            throw error;
        }
    }
    // delete Users
    static async deleteUser(id){
        try {
            await UserModel.findByIdAndDelete(id);

        } catch (error) {
          throw error;   
        }
    }
    
}
module.exports = User;