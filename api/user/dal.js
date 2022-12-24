// 
const AppError = require("../../utils/appError");

// user model
const UserModel = require("./model")

class User {

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
}
module.exports = User;