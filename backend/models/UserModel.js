import mongoose from "mongoose";
import crypto from "crypto"; //  Imports the Node.js crypto library for generating secure random strings.

// Destructure the Schema class from the Mongoose library
const { Schema } = mongoose;

// Create a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, email and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
  {
    username: {
      type: String, 
      required: true, 
      unique: true, 
      minlength: 5, 
    },
    password: {
      type: String, 
      required: true, 
      minlength: 6, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    consent: { // whether the user agrees to the terms and conditions when signing up
      type: Boolean,
      required: true
    },
    location: {
      type: String,
      default: ""
    },
    introduction: {
      type: String,
      minlength: 5,
      maxlength: 200,
      default: "Hello!"
    },
    products: {
      type: Array,
      minlength: 0
    },
    accessToken: {
      type: String, 
      default: () => crypto.randomBytes(128).toString("hex"), // Sets a default value using a cryptographic random string
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.
export const UserModel = mongoose.model("User", userSchema);

// In summary, this code defines a Mongoose schema (userSchema) that describes the structure of documents for users in a MongoDB collection. It also creates a Mongoose model (UserModel) associated with the "users" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting user documents.
