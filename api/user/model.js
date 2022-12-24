
// Mongoose
const mongoose = require("mongoose");
// 
const validator = require("validator");
// Students Schema
const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [50, "First name can not exceed 50 characters"],
        minlength: [1, "First name can not be less than one character"],
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
        maxlength: [50, "Last name can not exceed 50 characters"],
        minlength: [1, "Last name can not be less than one character"],
      },
      kirstnaName: {
        type: String,
        required: [true, "  kirstna name is required"],
        maxlength: [50, "  kirstna name can not exceed 50 characters"],
        minlength: [1, "  kirstna name can not be less than one character"],
      },
      email: {
        type: String,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: "Invalid email address inserted",
        },
      },
      phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        maxlength: [20, "Phone number can not exceed 20 characters"],
        minlength: [10, "Phone number can not be less than 10 characters"],
      },
      batch: {
        type: String,
        required: [true, "batch number is required"]  
      },
      isrep: {
        type: Boolean,
        required: false  
      },
      department: {
        type: String,
        required: [true, "batch number is required"]  
      },
      nisehaAbat: {
        type: String,
        required: false
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password can not be less than 8 characters"],
      },
  
      passwordConfirm: {
        type: String,
        required: [true, "Password confirm is required"],
        validate: {
          validator: function (value) {
            return this.password === value;
          },
          message: "Password and Password Confirm must be the same",
        },
      },
      passwordResetToken: String,
      passwordResetExpire: Date,
      passwordChangedAt: Date,
    
      role:{
        type:String,
        
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

// Create and export User model
const User = mongoose.model("User", userSchema);

module.exports = User;