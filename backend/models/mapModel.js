import mongoose from "mongoose";

const { Schema } = mongoose;

export const mapSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      requiered: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

export const mapModel = mongoose.model("Map", mapSchema);
