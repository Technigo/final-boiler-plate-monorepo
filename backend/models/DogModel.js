import mongoose from "mongoose";

// Create a dog schema
const DogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  special_adoption: Boolean,
  size: String,
  organisation: String,
  image: {
    format: String,
    data: String
  }
});

const DogModel = mongoose.model("DogModel", DogSchema)

export default DogModel