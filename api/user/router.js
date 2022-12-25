
// endpoints
/**
 * 
 * getAll users
 * CRUD   UserById
 * get Users By Class
 * filter users by name, batch, department, class
 *
 * assign yekiflat teteri by user id
 * create, get all kiflteteri
 * get all kiflat
 * demote by user id -- from kifl teteri to member
 * demote all reps
 * 
 * 
 */

// Express
const express = require("express");

// Router
const router = express.Router();

// user router
const userController = require("./controller");


router.route("/").get(userController.fetchUsers).post(userController.createUser);

module.exports = router;