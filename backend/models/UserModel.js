import mongoose from "mongoose";
import crypto from "crypto"; // Imports the Node.js crypto library for generating secure random strings.

const { Schema } = mongoose;

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
    // Define the 'accessToken' field with a String data type.
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string.
    },
    // Define the 'isAdmin' field with a Boolean data type.
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // User is not an admin by default.
    },
  },
  {
    timestamps: true,
  }
);

// This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
export const UserModel = mongoose.model("User", userSchema);

// In summary, this code defines a Mongoose schema (userSchema) that describes the structure of documents for users in a MongoDB collection. It also creates a Mongoose model (UserModel) associated with the "users" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting user documents.
