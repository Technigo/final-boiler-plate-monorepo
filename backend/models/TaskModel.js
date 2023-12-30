import mongoose from "mongoose";

const { Schema } = mongoose;

export const taskSchema = new Schema(
  {
    // Define the 'task' field with a String data type
    task: {
      type: String, // Specifies that 'task' should be a string
      required: true, // Indicates that 'task' is a required field
      minlength: 2, // Sets a minimum length of 5 characters for 'task' title
      maxlength: 30,
    },
    category: {
      type: String,
      enum: ["Garden", "Pets", "Shopping", "Repairs", "Other"],
      required: true,
    },
    area: {
      type: String,
      enum: [
        "Varberg City Center",
        "Himle",
        "Kungsäter",
        "Rolfstorp",
        "Tvååker",
        "Veddige",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 300,
    },
    // Define the 'done' field with a Boolean data type
    // done: {
    //   type: Boolean, // Specifies that 'done' should be a Boolean
    //   default: false, // Sets a default value of 'false' for 'done'
    // },
    // Define the relationship between the user and his/her tasks --  1:1 relationship with the user or 1 user can have many tasks
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    creatorUsername: String,

    volunteers: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }], //  The user's task ids
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model for tasks utilizing the taskSchema and crud operations can be performed on the tasks collection using the TaskModel.
export const TaskModel = mongoose.model("Task", taskSchema);
