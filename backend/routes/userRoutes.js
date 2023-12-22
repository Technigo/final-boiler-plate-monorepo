import express from "express";
import listEndpoints from "express-list-endpoints";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";

const router = express.Router();

// Route to get available endpoints
router.get("/", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json({ endpoints });
});

// Registration endpoint
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      // if so, set http status to a 400code
      res.status(400);
      // and throw new error with some info
      throw new Error("Please add all fields");
    }

    // Check if the current user trying to register is using an username or email that matches with the same username or email in the database, so they would have to choose something different
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(400);
      throw new Error(
        `User with ${
          existingUser.username === username ? "username" : "email"
        } already exists`
      );
    }

    const user = new UserModel({
      email,
      username,
      password: bcrypt.hashSync(password, 10),
    });

    await user.save();
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res.status(400).json({
      message: "Could not create user",
      errors: err.errors,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    await UserModel.find()
      .sort({ createdAt: "desc" })
      .exec()
      .then((result) => {
        res.json(result);
      });
  } catch (error) {
    res.json(error);
  }
});

export default router;
