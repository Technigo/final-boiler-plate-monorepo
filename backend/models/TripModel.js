import mongoose from "mongoose";

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'taskSchema'
// Creates a new Mongoose schema named taskSchema that defines the structure of a document in the MongoDB collection. It includes fields like task, createdAt, and done, specifying their data types, validation rules, and default values.
export const tripSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    pointOfOrigin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TripModel = mongoose.model("Trip", tripSchema);
