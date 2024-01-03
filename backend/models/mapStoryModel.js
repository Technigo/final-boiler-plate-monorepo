import mongoose from "mongoose";

const { Schema } = mongoose;

const mapStorySchema = new Schema({
  // id: {
  //   type: Number,
  //   required: true,
  // },
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
      // required: true,
    },
    lng: {
      type: Number,
      // required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add new fields
  city: {
    type: String,
    required: false, // Set to true if city is a required field
  },
  image: {
    type: String,
    required: false,
    enum: [
      'image1.png', 'image2.png', 'image3.png', 'image4.png', 
      'image5.png', 'image6.png', 'image7.png', 'image8.png', 
      'image9.png', 'image10.png', 'image11.png', 'image12.png'
    ],
  },
});

export const mapStoryModel = mongoose.model("mapStoryModel", mapStorySchema);
