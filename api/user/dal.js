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
            const newUser = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                batch:data.batch,
                department:data.department
            }
            const user = await UserModel.findByIdAndUpdate(id,newUser);
            return user;
        } catch (error) {
            throw error
        }
    }
}
module.exports = User;