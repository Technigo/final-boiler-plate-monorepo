import mongoose from "mongoose";

const { Schema } = mongoose;

export const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      minlength: 5,
    },

    done: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const TaskModel = mongoose.model("Task", taskSchema);
