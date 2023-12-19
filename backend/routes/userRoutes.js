import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/userController";
import { validateRegistration, validateLogin } from "../middleware/validation";

const router = express.Router();

// REGISTER ROUTE: Handle user registration with validation middleware
router.post("/register", validateRegistration, registerUserController);

// LOGIN ROUTE: Handle user login with validation middleware
router.post("/login", validateLogin, loginUserController);

export default router;
