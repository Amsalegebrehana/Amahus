
// user dal
const User = require("./dal");
// AppError
const AppError = require("../../utils/appError");
// pagination
const pagination = require("../../utils/pagination");

exports.fetchUsers = async (req,res, next)=>{
    try {
       
        const { page = pagination.page, limit = pagination.limit } = req.query;
        const users = await User.fetchUsers(page,limit);
        
        // number of all users in db
        const userCount = await User.usersCount();

        // check if user exist
        if(!users){
            return (new AppError("There is no users", 400));
        }
        // response
        res.status(200).json({
            status: "Success",
            data: {users},
            totalPages: Math.ceil(userCount / limit),
            currentPage: page
        });
        
    } catch (error) {
        next(error)
    }
}

exports.createUser = async (req,res, next) =>{
    try {
        const data = req.body;
      
        const user = await User.createUser(data);
        

        res.status(200).json({
            status:"Success",
            data:{user},
            message:"New user created."
        })
    } catch (error) {
        next(error)
    }
}
// get user by id
exports.getUserById = async (req,res,next) =>{
    try {
        const user = await User.getUserById(req.params.id);
        if(!user){
            return (new AppError("There is no user by this id.", 400));
        }
        // response
        res.status(200).json({
            status:"Success",
            data:{user}
        })
    } catch (error) {
        next(error)
    }
}
// update user info
exports.updateUser = async (req,res,next) =>{
    try {
        const data = req.body;
        const user = await User.getUserById(req.params.id);

        if(!user){
            return (new AppError("There is no user by this id.", 400));
        }
        await User.updateUser(req.params.id, data);
     
        // response
        res.status(200).json({
            status:"Success",
            message: "User updated successfull."
        })
        
    } catch (error) {
        next(error)
    }
}