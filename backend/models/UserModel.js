import mongoose from "mongoose";
import crypto from "crypto"; //  Imports the Node.js crypto library for generating secure random strings.

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'userSchema'
// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type
    username: {
      type: String, // Specifies that 'username' should be a string
      required: true, // Indicates that 'username' is a required field
      unique: true, // Ensures that 'username' values are unique
      minlength: 2, // Sets a minimum length of 2 characters for 'username'
    },
    // Define the 'password' field with a String data type
    password: {
      type: String, // Specifies that 'password' should be a string
      required: true, // Indicates that 'password' is a required field
      minlength: 6, // Sets a minimum length of 6 characters for 'password'
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //Define the 'accessToken' field with a String data type
    accessToken: {
      type: String, // Specifies that 'accessToken' should be a string
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
