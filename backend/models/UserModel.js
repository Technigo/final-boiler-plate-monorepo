import mongoose from "mongoose";

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Creates a new Mongoose schema named userSchema that defines the structure of a user document in the MongoDB collection. It includes fields like username, password, and accessToken, specifying their data types, validation rules, and default values.
const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type
    username: {
      type: String, // Specifies that 'username' should be a string
      required: true, // Indicates that 'username' is a required field
      minlength: 5, // Sets a minimum length
      unique: true, // Make sure the username is unique in the database
    },
    // Define the 'password' field with a String data type
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        // Password requirements added
        validator: function (password) {
          const hasNumber = /[0-9]/.test(password);
          const hasCapitalLetter = /[A-Z]/.test(password);
          const hasSpecialSign = /[!@#\$%\^&\*]/.test(password);
          return hasNumber && hasCapitalLetter && hasSpecialSign;
        },
        message: 'Password must contain at least one number, one capital letter, and one special character.'
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
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
