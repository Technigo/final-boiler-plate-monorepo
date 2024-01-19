import { UserModel } from "../models/UserModel";
import { MessageModel } from "../models/MessageModel";
import { TripModel } from "../models/TripModel";

export const UserController = {
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

  getUserTrips: async (req, res) => {
    const { id } = req.params;
    try {
      // Fetch trips where the loggedInUser is the main user or a passenger
      const trips = await TripModel.find({
        $or: [
          { user: id }, // User is the main user
          { "passengers.userId": id }, // User is a passenger
        ],
      });

      res.status(200).json(trips);
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

  passengerJoin: async (req, res) => {
    const { tripid } = req.params;
    const { id, username } = req.body;

    try {
      const trip = await TripModel.findOne({ _id: tripid });

      if (trip.availableSeats > 0) {
        trip.passengers.push({ userId: id, username: username });

        trip.availableSeats -= 1;

        const updated = await trip.save();
        res.json({
          message: "Passenger added successfully",
          passenger: updated.passengers,
        });
      } else {
        res.status(400).json({ error: "No available seats" });
      }
    } catch (error) {
      res.status(400).json({
        message: "Could not add passenger",
        errors: error.errors,
      });
    }
  },
};
