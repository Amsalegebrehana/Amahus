
// class dal
const Class = require("./dal");
// AppError
const AppError = require("../../utils/appError");
// pagination
const pagination = require("../../utils/pagination");
const User = require("../user/model");


exports.fetchClasses = async (req, res, next) => {
    try {
        const { page = pagination.page, limit = pagination.limit} = req.query;
        const classes = await Class.fetchClasses(page, limit);

        // check if class exist
        if(!classes){
            return (new AppError("There is no classes", 400));
        }
        const totalClasses = await Class.classCount();

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

exports.createClass = async (req, res, next) => {
    try {

        const data = req.body;
        // validate if className is not null
        if (!data.className) {
            return next(new AppError("Class Name is required", 400));
        }


        const kifel = await Class.createClass(data);

        res.status(201).json({
            status:"Success",
            data:{kifel},
            message:"New class created",
        });
    } catch (error) {
        next(error);
    }

}

exports.fetchClassById = async (req, res, next) => {
    try {
        const classId  = req.params.id;
        const data = await Class.fetchClassById(classId);
        

        res.status(200).json({
            status:"Success",
            data:{data},

        });

    } catch (error) {
        next(error);
    }

}

exports.updateClassById = async (req, res, next) => {
    try {
        const classId = req.params.id;
        const data = req.body;
        
        const newData = await Class.updateClassById(classId, data);

        res.status(200).json({
            status:"Success",
            data:newData,
    });

    }catch(error) {
        next(error);
    }

}


exports.assignRepresentative = async (req, res, next) => {

}

exports.demoteRepresentative  = async (req, res, next) => {
    
}