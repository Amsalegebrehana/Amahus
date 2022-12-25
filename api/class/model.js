
// Mongoose
const mongoose = require("mongoose");
// 
const validator = require("validator");

const Schema = mongoose.Schema;

// Class Schema
const classSchema = new Schema(
    {
        className: {
            type: String,
            required: [true, "Class name is required"],
            maxlength: [60, "Class name can not exceed 60 characters"],
            minlength: [3, "Class name can not be less than three character"],
        },
        description: {
            type: String
        },
        representativeId: {
            type: Schema.Types.ObjectId,
            ref: "userSchema",
            required: true
        }
    },
    {
      writeConcern: {
        w: "majority",
        j: true,
      },
      timestamps: true,
    }
);

// create and export class model
const Class = mongoose.model("Class", classSchema);

module.exports = Class;