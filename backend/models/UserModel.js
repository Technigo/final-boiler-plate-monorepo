import mongoose from "mongoose";
import crypto from "crypto"; //  Imports the Node.js crypto library for generating secure random strings.

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,

  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
},
  {
    timestamps: true,
  }
)

export const userModel = mongoose.model("user", userSchema);


// Create a Mongoose model named 'UserModel' based on the 'userSchema' for the 'users' collection
// This model is used to interact with the "users" collection in the MongoDB database. It allows you to perform CRUD operations on user documents and provides methods for data validation based on the schema.

// In summary, this code defines a Mongoose schema (userSchema) that describes the structure of documents for users in a MongoDB collection. It also creates a Mongoose model (UserModel) associated with the "users" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting user documents.