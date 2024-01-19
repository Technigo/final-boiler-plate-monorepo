const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/signUp", userController.createUser);

router.post("/login", userController.loginUser);
router.route("/account").get(userController.getUser).put(userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
