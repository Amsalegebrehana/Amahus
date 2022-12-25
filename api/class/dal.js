// 
const AppError = require("../../utils/appError");

// class model
const ClassModel = require("./model");

class Class {
    static async fetchClasses(page, limit) {

        try {
            const classes = await ClassModel.find().limit(limit * 1)
                            .skip((page - 1) * limit)
                            .exec();
            return classes;
        } catch (error) {
            throw error;
        }
    }

    static async classCount() {
        
        try {
            const total = await ClassModel.countDocuments();
            return total;
        } catch (error) {
            throw error;
        }
    }

    static async createClass(data){
        try {
            const classData = await ClassModel.insertMany(data);
            if(!classData){
                throw new AppError("There is a field missing", 400);
            }
            
            return classData;
        } catch(error) {
            throw error;
        }
    }

    static async fetchClassById(classId) {
        try {
            const data = await ClassModel.findOne({_id: classId});

            if(!data) {
                throw new AppError("No Class with that Id ", 400);
            }
            return data;
        } catch(error) {
            throw error;
        }
    }

    static async updateClassById(classId, data) {
        try {
            const newClass = await ClassModel.findByIdAndUpdate(classId, data, {
                new: true
            });

            return newClass;
        } catch(error) {
            throw error;
        }
    }


}



module.exports = Class;