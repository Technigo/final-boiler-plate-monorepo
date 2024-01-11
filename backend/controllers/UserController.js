import { UserModel } from "../models/UserModel";
import { MessageModel } from "../models/MessageModel";
import { TripModel } from "../models/TripModel";
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
      const user = await UserModel.findOne({ user_id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  getUserMessages: async (req, res) => {
    const { senderid, recipientid } = req.params;

    //Might have to make up a solution for this part
    //    const userData = await getUser
    //const ourUserId = userData.userId;
    //const ourUserId = userId;
    try {
      const messages = await MessageModel.find({
        sender: {
          $in: [senderid, recipientid],
        },
        recipient: {
          $in: [senderid, recipientid],
        },

        // sender: { $in: [senderid, recipientid] },
        // recipient: { $in: [senderid, recipientid] },
      })
        .sort({ createdAt: "ascending" })
        .exec();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllMessages: async (req, res) => {
    try {
      const messages = await MessageModel.find()
        .sort({ createdAt: "ascending" })
        .exec();
      res.json(messages);
    } catch (error) {
      res.json(error);
    }
  },

  addTrip: async (req, res) => {
    const { from, to, message, date, time, make, model, availableSeats, reg } =
      req.body;
    try {
      const trip = new TripModel({
        from,
        to,
        message,
        date,
        time,
        make,
        model,
        availableSeats,
        reg,
      });

      await trip.save();
    } catch (error) {
      res.status(400).json({
        message: "Could not post trip",
        errors: error.errors,
      });
    }
  },
};
