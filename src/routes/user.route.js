const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.findUserById);
router.post("/user", userController.addUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = {
  routes: router,
};
