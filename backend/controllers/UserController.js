import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";

export const UserController = {
  getProfile: (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  },

  checkAuthentication: (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  },

  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        res.status(400).json({ message: "Please add all fields" });
      }

      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        res.status(400).json({
          message: `User with ${
            existingUser.username === username ? "username" : "email"
          } already exists`,
        });
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
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find().sort({ createdAt: "desc" }).exec();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },

  getUserById: async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await UserModel.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
