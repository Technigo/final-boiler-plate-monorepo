import mongoose from "mongoose";
import crypto from "crypto"; // Imports the Node.js crypto library for generating secure random strings.

const { Schema } = mongoose;

// Creates a new Mongoose schema with the following fields:
const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type.
    username: {
      type: String, // Specifies that 'username' should be a string.
      required: true, // Indicates that 'username' is a required field.
      unique: true, // Ensures that 'username' values are unique.
      minlength: 3, // Sets a minimum length of 3 characters for 'username'.
    },
    // Define the 'password' field with a String data type.
    password: {
      type: String, // Specifies that 'password' should be a string.
      required: true, // Indicates that 'password' is a required field.
      minlength: 6, // Sets a minimum length of 6 characters for 'password'.
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // favourites: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Favourites",
    //   },
    // ],
    // Defines the 'role' field with a String data type.
    role: {
      type: String,
      enum: ["user", "admin"], // Specifies that 'role' can only be either "user" or "admin".
      default: "user", // Sets the default value of 'role' to "user".
    },
  },
  {
    timestamps: true, // Adds timestamps to the document: createdAt and updatedAt.
  }
);

// Creates a model from the schema and exports it.
export const UserModel = mongoose.model("User", userSchema);
