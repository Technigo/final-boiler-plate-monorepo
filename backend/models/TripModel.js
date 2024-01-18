import mongoose from "mongoose";

const { Schema } = mongoose;

export const tripSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    reg: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    passengers: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    music: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.methods.joinTrip = async function (userId) {
  try {
    if (this.availableSeats > 0) {
      this.availableSeats -= 1;
      this.passengers.push(userId);
      await this.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error saving trip:", error);
    return false;
  }
};

export const TripModel = mongoose.model("Trip", tripSchema);
