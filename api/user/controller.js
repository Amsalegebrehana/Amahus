
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
      
        // check if user exist
        if(!users){
            return (new AppError("There is no users", 400));
        }
        // response
        res.status(200).json({
            status: "Success",
            data: {users},
            totalPages: Math.ceil(users.length / limit),
            currentPage: page
        });
        
    } catch (error) {
        next(error)
    }
}