
// class dal
const Class = require("./dal");
// user dal
const User = require("../user/dal");
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


        const newClass = await Class.createClass(data);

        res.status(201).json({
            status:"Success",
            data:{newClass},
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
    try{
        const {classId, userId} = req.params;
        const kifel = await Class.fetchClassById(classId);

        // check if id is correct
        if(!kifel){
            return next(
                new AppError("There is no Class with the specified id", 400)
              );
        }

        // check if class have rep already assigned
        if (kifel.representativeId != null){
            return next(
                new AppError("Representative is already assigned", 400)
            );
        }
        

        const user = await User.getUserById(userId);
        // check if user is not null
        if(!user){
            return next(
                new AppError("There is no user with the specified id", 400)
              );
        }
        

        // Check if user is already rep
        if (user.role == "Representative") {
            return next(
                new AppError("User already representative", 400)
              );
        }

        // check if user is in another class
        if (user.classId != kifel.id) {
            return next(
                new AppError("User is in another class", 400)
              );
        }

        // update user
        const updatedUser = await User.updateUser(userId, {role: "Representative" });

        // update class
        const updatedClass = await Class.updateClassById(classId, {representativeId: userId})


        
        res.status(201).json({
            status:"Success",
            data:updatedClass,
         });
        

    } catch(error) {
        next(error);
    }

}

exports.demoteRepresentative  = async (req, res, next) => {
    try {  
        
        const classId = req.params.classId;
        const kifel = await Class.fetchClassById(classId);

        // check if id is correct
        if(!kifel){
            return next(
                new AppError("There is no Class with the specified id", 400)
              );
        }

        // check if class have no rep already assigned
        if (kifel.representativeId == null){
            return next(
                new AppError("Class does not have a representative", 400)
            );
        }
        
        const userId = kifel.representativeId;

        const user = await User.getUserById(userId);

        // check if user is not null
        if(!user){
            return next(
                new AppError("There is no user with the specified id", 400)
              );
        }
        

        // Check if user is not already rep
        if (user.role != "Representative") {
            return next(
                new AppError("User is not representative", 400)
              );
        }
        
        // check if user is in another class
        if (user.classId != kifel.id) {
            return next(
                new AppError("User is in another class", 400)
              );
        }

        // update user
        const updatedUser = await User.updateUser(userId, {role: "Member" });

        // update class
        const updatedClass = await Class.updateClassById(classId, {representativeId: null})


        
        res.status(201).json({
            status:"Success",
            data:updatedClass,
         });

    } catch(error){
        next(error);
    }
}