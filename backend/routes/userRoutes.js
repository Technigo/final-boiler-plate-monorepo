import express from "express";
import { UserController } from "../controllers/UserController";

const { requiresAuth } = require("express-openid-connect");
const router = express.Router();

router.get("/profile", requiresAuth(), UserController.getProfile);
router.get("/", UserController.checkAuthentication);
router.post("/register", UserController.registerUser);
router.get("/users", UserController.getAllUsers);
router.get("/user/:user_id", UserController.getUserById);
router.get("/messages/:senderid/:recipientid", UserController.getUserMessages);
router.get("/getallmessages", UserController.getAllMessages);

export default router;
