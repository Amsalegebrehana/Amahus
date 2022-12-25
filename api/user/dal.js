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
}
module.exports = User;