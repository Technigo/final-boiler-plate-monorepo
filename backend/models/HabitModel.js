import mongoose from "mongoose";

// Import the Schema class from the Mongoose library
// Destructures the Schema class from the Mongoose library, allowing us to create a schema.
const { Schema } = mongoose;

// Create a new Mongoose schema named 'taskSchema'
// Creates a new Mongoose schema named taskSchema that defines the structure of a document in the MongoDB collection. It includes fields like task, createdAt, and done, specifying their data types, validation rules, and default values.
export const habitSchema = new Schema(
  {
    // Define the 'task' field with a String data type
    habit: {
      type: String, // Specifies that 'task' should be a string
      required: true, // Indicates that 'task' is a required field
      minlength: 5, // Sets a minimum length of 5 characters for 'task'
    },
    finished: [Date],
    // Define the relationship between the user and his/her tasks --  1:1 relationship with the user or 1 user can have many tasks
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);



// Create a Mongoose model named 'TaskModel' based on the 'taskSchema' for the 'tasks' collection
// This model is used to interact with the "tasks" collection in the MongoDB database. It allows you to perform CRUD operations on documents in that collection and provides methods for data validation based on the schema.
export const HabitModel = mongoose.model("Habit", habitSchema);

// In summary, this code defines a Mongoose schema (taskSchema) that describes the structure of documents for tasks in a MongoDB collection. It also creates a Mongoose model (TaskModel) associated with the "tasks" collection, which can be used to interact with the database and perform operations like creating, reading, updating, and deleting tasks.
