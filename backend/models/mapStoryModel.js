import mongoose from "mongoose";

const { Schema } = mongoose;

const mapStorySchema = new Schema({
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
    type: {
      lat: Number,
      lng: Number,
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const mapStoryModel = mongoose.model("MapStory", mapStorySchema);
