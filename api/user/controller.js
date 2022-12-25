
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