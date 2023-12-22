import mongoose from "mongoose";

const { Schema } = mongoose;

const mapStorySchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
  },
  category: {
    type: String,
    required: true,
    enum: ["historical", "hearsay", "anecdote"],
  },
  ranking: {
    type: Number,
    default: 0,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const mapStoryModel = mongoose.model("mapStoryModel", mapStorySchema);
