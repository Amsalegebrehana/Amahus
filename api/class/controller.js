
// class dal
const Class = require("./dal");
// AppError
const AppError = require("../../utils/appError");
// pagination
const pagination = require("../../utils/pagination");


exports.fetchClasses = async (req, res, next) => {
    try {
        const { page = pagination.page, limit = pagination.limit} = req.query;
        const classes = await Class.fetchClasses(page, limit);

        // check if class exist
        if(!classes){
            return (new AppError("There is no classes", 400));
        }
        const totalClasses = await Class.totalClasses();

        res.status(200).json({
            status: "Success",
            data: {classes},
            totalPages: Math.ceil(totalClasses / limit),
            currentPage: page 
        });


    } catch(error) {
        next(error);
    }
}