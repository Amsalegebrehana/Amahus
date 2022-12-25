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

    static async totalClasses() {
        
        try {
            const total = await ClassModel.countDocuments();
            return total;
        } catch (error) {
            throw error;
        }
    }
}



module.exports = Class;