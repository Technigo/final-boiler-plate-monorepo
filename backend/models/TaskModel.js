import mongoose from "mongoose";

const { Schema } = mongoose;

export const taskSchema = new Schema(
  {
    // Define the 'task' field with a String data type
    task: {
      type: String, // Specifies that 'task' should be a string
      required: true, // Indicates that 'task' is a required field
      minlength: 3, // Sets a minimum length of 3 characters for 'task' title
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
        "Bua",
        "Getterön",
        "Himle",
        "Hunnestad",
        "Källstorp",
        "Kungsäter",
        "Rolfstorp",
        "Skällinge",
        "Tofta",
        "Torpa",
        "Trönningenäs",
        "Tvååker",
        "Tångaberg",
        "Valinge",
        "Varberg city",
        "Veddige",
        "Väröbacka",
        "Årnäs",
        "Åsby (Derome)",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 300,
    },

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
