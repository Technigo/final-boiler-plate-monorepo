// import mongoose from "mongoose";

// // Import the Schema class from the Mongoose library
// // Destructures the Schema class from the Mongoose library, allowing us to create a schema.
// const { Schema } = mongoose;

// // Create a new Mongoose schema named 'taskSchema'
// // Creates a new Mongoose schema named taskSchema that defines the structure of a document in the MongoDB collection. It includes fields like task, createdAt, and done, specifying their data types, validation rules, and default values.
// export const tripSchema = new Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: User,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     destination: {
//       type: String,
//       required: true,
//     },
//     pointOfOrigin: {
//       type: String,
//       required: true,
//     },
//     dateOfDeparture: {
//       type: Date,
//     },
//     timeOfDeparture: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const TripModel = mongoose.model("Trip", tripSchema);

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
    time: {
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
  },
  {
    timestamps: true,
  }
);

export const TripModel = mongoose.model("Trip", tripSchema);


