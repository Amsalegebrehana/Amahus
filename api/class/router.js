
// Express
const express = require("express");

// Router
const router = express.Router();

// class router
const classController = require("./controller");


// routes
router.route("/").get(classController.fetchClasses)


module.exports = router;