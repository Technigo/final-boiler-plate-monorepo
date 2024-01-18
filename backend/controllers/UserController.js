import { UserModel } from "../models/UserModel";
import { MessageModel } from "../models/MessageModel";
import { TripModel } from "../models/TripModel";
import bcrypt from "bcrypt";

export const UserController = {
  // getProfile: (req, res) => {
  //   res.send(JSON.stringify(req.oidc.user));
  // },

  checkAuthentication: (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  },

  joinTrip: async (req, res) => {
    const { tripId, userId } = req.params;
    console.log("Received tripId:", tripId);
    console.log("Received userId:", userId);

    try {
      const trip = await TripModel.findById(tripId);

      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      // Check if the user is already part of the trip
      if (trip.passengers.includes(userId)) {
        return res
          .status(400)
          .json({ message: "User is already part of the trip" });
      }

      // Check if there are available seats
      if (trip.availableSeats <= 0) {
        return res
          .status(400)
          .json({ message: "No available seats for the trip" });
      }

      // Update the trip information
      trip.availableSeats -= 1;
      trip.passengers.push(userId);

      // Save the updated trip to the database
      await trip.save();

      res.json(trip); // Return the updated trip information to the client
    } catch (error) {
      console.error("Error joining trip:", error);
      res.status(500).json({ error: error.message });
    }
  },
  // registerUser: async (req, res) => {
  //   const { username, email, password } = req.body;
  //   try {
  //     if (!username || !email || !password) {
  //       res.status(400).json({ message: "Please add all fields" });
  //     }

  //     const existingUser = await UserModel.findOne({
  //       $or: [{ username }, { email }],
  //     });

  //     if (existingUser) {
  //       res.status(400).json({
  //         message: `User with ${
  //           existingUser.username === username ? "username" : "email"
  //         } already exists`,
  //       });
  //     }

  //     const user = new UserModel({
  //       email,
  //       username,
  //       password: bcrypt.hashSync(password, 10),
  //     });

  //     await user.save();
  //     res.status(201).json({ id: user._id, accessToken: user.accessToken });
  //   } catch (err) {
  //     res.status(400).json({
  //       message: "Could not create user",
  //       errors: err.errors,
  //     });
  //   }
  // },

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

  getUserByMongoId: async (req, res) => {
    const { mongoid } = req.params;
    try {
      const user = await UserModel.findById({ _id: mongoid });
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

    try {
      const messages = await MessageModel.find({
        sender: {
          $in: [senderid, recipientid],
        },
        recipient: {
          $in: [senderid, recipientid],
        },
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
    const {
      from,
      to,
      message,
      date,
      make,
      model,
      availableSeats,
      reg,
      user,
      username,
      music,
    } = req.body;
    console.log(req.body);

    try {
      const trip = new TripModel({
        from,
        to,
        message,
        date,
        make,
        model,
        availableSeats,
        reg,
        user,
        username,
        music,
      });

      await trip.save();

      const joined = await trip.joinTrip(user);

      if (!joined) {
        return res
          .status(400)
          .json({ message: "No available seats for the trip" });
      }

      res.status(201).json({ message: "Trip successfully registered" });
    } catch (error) {
      res.status(400).json({
        message: "Could not post trip",
        errors: error.errors,
      });
    }
  },

  getTrips: async (req, res) => {
    try {
      const trips = await TripModel.find().sort({ createdAt: "desc" }).exec();
      res.json(trips);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  getSingleTrip: async (req, res) => {
    const { id } = req.params;
    try {
      const trip = await TripModel.findOne({ _id: id });
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.json(trip);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  deleteSingleTrip: async (req, res) => {
    const { id } = req.params;
    try {
      const trip = await TripModel.findOneAndDelete({ _id: id });
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.json(trip);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  //Experiment
  addMessage: async (req, res) => {
    const { sender, recipient, text } = req.body;

    try {
      const message = new MessageModel({
        sender,
        recipient,
        text,
      });

      await message.save();
    } catch (error) {
      res.status(400).json({
        message: "Could not send message",
        errors: error.errors,
      });
    }
  },

  // passengerJoin: async (req, res) => {
  //   console.log();
  //   const { tripid } = req.params;
  //   const { id, username } = req.body;
  //   const newPassenger = {
  //     userId: id,
  //     username: username,
  //   };

  //   try {
  //     console.log(req.body);
  //     const findTrip = await TripModel.findOne({ _id: tripid });
  //     if (!findTrip) {
  //       return res
  //         .status(404)
  //         .json({ message: "Trip not found in passengerJoin" });
  //     }
  //     findTrip.passengers.push(newPassenger);
  //     // const passenger = await TripModel.findOneAndUpdate(
  //     //   { _id: tripid },
  //     //   { $push: { passengers: newPassenger } },
  //     //   { new: true }
  //     // );
  //     // console.log(passenger);
  //     // res.json({ passenger });

  //     const updatedTrip = await findTrip.save();

  //     res.json({ passenger: updatedTrip.passengers });
  //   } catch (error) {
  //     res.status(400).json({
  //       message: "Could not add passenger",
  //       errors: error.errors,
  //     });
  //   }
  // },
  passengerJoin: async (req, res) => {
    console.log();
    const { tripid } = req.params;
    const { id, username } = req.body;
    const newPassenger = {
      userId: id,
      username: username,
    };

    try {
      console.log(req.body);
      const findTrip = await TripModel.findOne({ _id: tripid });

      findTrip.passengers.push({ id, username });
      const updated = await findTrip.save();
      res.json({
        message: "Passenger added successfully",
        passenger: updated.passengers,
      });
    } catch (error) {
      res.status(400).json({
        message: "Could not add passenger",
        errors: error.errors,
      });
    }
  },
};
