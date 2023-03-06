
// endpoints


// Express
const express = require("express");

// Router
const router = express.Router();

// user router
const userController = require("./controller");


router.route("/search").get(userController.filterUser);

router.route("/").get(userController.fetchUsers).post(userController.createUser);

router.route("/:id").get(userController.getUserById).patch(userController.updateUser).delete(userController.deleteUser);
module.exports = router;
