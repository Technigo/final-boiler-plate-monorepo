const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please tell us your name!"] },
    email: {
      type: String,
      require: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide us a valid email"],
    },
    photo: String,
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
    accessToken: { type: String, default: () => crypto.randomBytes(128).toString("hex") },
    sticker: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sticker" }],
    todayGoal: { type: String, default: "Goal 🎯" },
    weeklyGoal: { type: String, default: "Goal 🎯" },
    monthlyGoal: { type: String, default: "Goal 🎯" },
    yearlyGoal: { type: String, default: "Goal 🎯" },
    generalGoal: { type: String, default: "Goal 🎯" },
    theme: {
      type: String,
      default: "warning",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

/* 
sticker {
title:string,
position:{x:number,y:number},
bgColor:string,
textColor:string,
test:string
size:{width:string,height:string}
}*/
