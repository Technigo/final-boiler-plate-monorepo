import mongoose from "mongoose"; // Imports the mongoose dependency.

const { Schema } = mongoose; // Destructures the Schema property from the mongoose object.

// Creates a new Mongoose schema with the following fields:
const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type.
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    // Define the 'password' field with a String data type.
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Define the 'email' field with a String data type.
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Define the 'accessToken' field with a String data type.
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds timestamps to the document: createdAt and updatedAt.
  }
);

// Creates a model from the schema and exports it.
export const UserModel = mongoose.model("User", userSchema);
