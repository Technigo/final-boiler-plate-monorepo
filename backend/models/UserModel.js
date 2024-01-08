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
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Use a regular expression to check if the email has the "@" symbol
          return /\S+@\S+\.\S+/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
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
