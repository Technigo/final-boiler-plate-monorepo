import mongoose from "mongoose";
import crypto from "crypto"; 

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // Define the 'username' field with a String data type
    username: {
      type: String, 
      required: true, 
      unique: true, 
      minlength: 2, 
    },
    // Define the 'password' field with a String data type
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

export const UserModel = mongoose.model("User", userSchema);

