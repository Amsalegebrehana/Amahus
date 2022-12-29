
// Express
const express = require("express");

// Router
const router = express.Router();

// class router
const classController = require("./controller");


// routes
router.route("/").get(classController.fetchClasses).post(classController.createClass);

router.route("/:id").get(classController.fetchClassById).put(classController.updateClassById);

router.route("/:classId/assign/:userId").post(classController.assignRepresentative);
router.route("/:classId/demote").put(classController.demoteRepresentative);

module.exports = router;