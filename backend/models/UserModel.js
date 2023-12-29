import mongoose from "mongoose";
import crypto from "crypto"; //  Imports the Node.js crypto library for generating secure random strings.

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
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

export const UserModel = mongoose.model("user", userSchema);
